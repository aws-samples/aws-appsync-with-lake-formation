import boto3
import os

def lambda_handler(event, context):
    print(event)
    # create Glue client
    glue = boto3.client('glue')
    s3_key_paths = event.get('detail').get('object').get('key').split('/')
    print(s3_key_paths)
    if s3_key_paths[0] == 'athena_results':
        print('Exiting')
        return
    
    # specify the name of the Glue crawler to start
    crawler_name = os.environ["CRAWLER_NAME"]
    
    # start the Glue crawler
    response = glue.start_crawler(Name=crawler_name)
    
    # print the response
    print(response)
    
    # return a message indicating that the crawler has started
    return {
        'statusCode': 200,
        'body': 'Glue crawler {} started.'.format(crawler_name)
    }
