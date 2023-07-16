import os
import boto3
import time
import pandas

sts_client =  boto3.client('sts')
dynamodb = boto3.resource('dynamodb')
cognito_idp_client = boto3.client('cognito-idp')

glue_database = os.environ['GLUE_DATABASE']
glue_owners_table = os.environ['GLUE_OWNERS_TABLE']
glue_companies_tables = os.environ['GLUE_COMPANIES_TABLE']
cognito_user_pool_id = os.environ['COGNITO_USER_POOL_ID']
athena_output_location =  os.environ['ATHENA_OUTPUT_LOCATION']

def lambda_handler(event, context):
    # TODO implement
    query_result = []
    try:
        # TODO: write code...
        event_ctx = event['ctx']
        print({'arguments': event_ctx.get('arguments')}, "\n=====\n")
        print({'identity': event_ctx.get('identity')}, "\n=====\n")
        print({'source': event_ctx.get('source')}, "\n=====\n")
        print({'headers': event_ctx['request'].get('headers')}, "\n=====\n")
        
        cognito_username = event_ctx.get('identity').get('username')
        cognito_group = event_ctx.get('identity').get('groups')[0]
        role_arn = get_cognito_group_role(cognito_group)
        access_key, secret_key, session_token = get_temp_creds(role_arn)
    
        athena_client = boto3.client('athena', aws_access_key_id=access_key, aws_secret_access_key=secret_key, aws_session_token=session_token)
        s3_client = boto3.client('s3', aws_access_key_id=access_key, aws_secret_access_key=secret_key, aws_session_token=session_token)
        query = f'SELECT c_owner.*, c.* FROM "AwsDataCatalog"."{glue_database}"."{glue_owners_table}" c_owner, "AwsDataCatalog"."{glue_database}"."{glue_companies_tables}" c where c.owner_id = c_owner.people_id order by c.company_name asc limit 40;'
        execution_id = execute_query(athena_client, query)
        loop_check = True
        while(loop_check):
            query_state, output_location = get_query_meta(athena_client, execution_id)
            print(query_state)
            if query_state == 'SUCCEEDED':
                query_result = get_query_result(s3_client, output_location)
                loop_check = False
            if query_state == 'FAILED' or query_state == 'CANCELLED':
                raise Exception('Query unable to run')
            else:
                time.sleep(2)
                print('Waiting for query to execute')
        
        print(query_result)
    except Exception as e:
        raise e
    return query_result


def execute_query(client, query):
    response = client.start_query_execution(
        QueryString=query,
        QueryExecutionContext={
            'Database': glue_database
        },
        ResultConfiguration={
            'OutputLocation': athena_output_location
        },
        WorkGroup='primary',
    )
    print(response)
    return response['QueryExecutionId']
    
def get_query_meta(client, execution_id):
    response = client.get_query_execution(QueryExecutionId=execution_id)
    print(response)
    return response['QueryExecution']['Status']['State'], response['QueryExecution']['ResultConfiguration']['OutputLocation']

def get_temp_creds(role_arn):
    response = sts_client.assume_role(
        RoleArn=role_arn,
        RoleSessionName='stsAssumeRoleAthenaQuery',
    )
    print(response)
    return response['Credentials']['AccessKeyId'], response['Credentials']['SecretAccessKey'], response['Credentials']['SessionToken']

def get_query_result(s3_client, output_location):
    bucket, object_key_path = get_bucket_and_path(output_location)
    response = s3_client.get_object(Bucket=bucket, Key=object_key_path)
    status = response.get("ResponseMetadata", {}).get("HTTPStatusCode")
    result = []
    if status == 200:
        print(f"Successful S3 get_object response. Status - {status}")
        df = pandas.read_csv(response.get("Body"))
        df = df.fillna('')
        result = df.to_dict('records')
        print(result)
    else:
        print(f"Unsuccessful S3 get_object response. Status - {status}")
    return result

def get_bucket_and_path(output_location):
    path_split = output_location.split('/')
    bucket_name = path_split[2]
    object_key_path = '/'.join(path_split[3:])
    print(bucket_name, object_key_path)
    return bucket_name, object_key_path

def get_cognito_group_role(group_name):
    response = cognito_idp_client.get_group(
            GroupName=group_name,
            UserPoolId=cognito_user_pool_id
        )
    print(response)
    role_arn = response.get('Group').get('RoleArn')
    return role_arn
    
