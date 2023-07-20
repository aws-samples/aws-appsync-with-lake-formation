# Query Data Lake using Appsync and Athena

This README explains how to upload code to an AWS Lambda function, create an AWS Layer, and attach the layer to the lambda. Additionally, it provides steps for creating Cognito users and adding them to already present Cognito groups.


## Requirements

* [Create an AWS account](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html) if you do not already have one and log in. The IAM user that you use must have sufficient permissions to make necessary AWS service calls and manage AWS resources.
* [Node and NPM](https://nodejs.org/en/download/) installed
* [Amplify CLI](https://docs.amplify.aws/cli/start/install/), only required to generate code as the backend deployment is done via AWS CDK
* [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) installed and configured
<br/>
<br/>


## 1. Upload Code to AWS Lambda Function

1. Log in to the AWS Management Console and navigate to the Lambda service console.
2. Navigate to Function Code page of `crawlerLambda` and `requestHandlerLambda`. Copy and paste the code of respective lambda functions from the `lambda` directory and Deploy the functions

## 2. Create AWS Lambda Layer

1. Navigate to the Lambda service.
2. Select `Layers` in the left menu.
3. Click `Create Layer`.
4. Enter a name and description for your layer.
5. Download this [package layer ZIP file](https://aws-blogs-artifacts-public.s3.amazonaws.com/artifacts/BDB-3234/package-layer.zip) 
6. Click the `Upload` button to upload the ZIP file.
7. Choose the `python 3.7` runtime for your layer.
8. Click `Create`.

## 3. Attach the Layer to a AppSync Request Handler Lambda

1. Navigate to the Lambda service console and select the `requestHandlerLambda` function.
2. Scroll down to the `Layers` section.
3. Click `Add layer`.
4. Select Custom layers option and Choose the layer along with its version you created earlier
5. Click `Add`.

## 4. Create Cognito Users and Add to Groups

1. Navigate to the Cognito service console.
2. Select the User Pools option from the left menu.
3. Select the appropriate user pool.
4. Select the `Users` tab.
5. Click the `Create user` button.
6. Enter the required user details, including their username, password and email(optional).
7. Click the `Create user` button to complete the process.
8. Select the user you want to add to the group by clicking on their username.
9. Click the `Add to group` button.
10. Select the appropriate group you want the user to be part of.
11. Click the `Add to group` button to complete the process.
12. Repeat the steps above for any other user that needs to be added.

## 5. Update LakeFormation Permissions

1. Navigate to the LakeFormation service console.
2. Select `Data lake permissions` under `Permissions` section from the left menu.
3. Revoke all permissions for `IAMAllowedPrincipals` under `Principal` column.

## 6. Upload dataset
1. Run following commands to upload the sample dataset Replace the the bucket_name placeholder with the S3 bucket provisioned using CloudFormation Template. 
    ```
    cd dataset
    aws s3 cp . s3://{bucket_name}/ --recursive
    ```
2. Optionally, you can upload the dataset on S3 bucket using AWS console. Make sure to keep the same directory structure provided in the `dataset` folder

## 7. Setup React Client Application

In order to view the data queried from datalake using AppSync GraphQl API, follow the instruction provided below to setup a react client application locally.

1. Navigate to react-app:

    ```
    cd react-app
    ```

1. Install the project dependencies:

   ```
   npm install
   ```
2. Open the file `.env` and update the configuration details by copying it from appropriate AWS service settings

4. Generate the necessary code to interact with the API using the [Amplify CodeGen](https://docs.amplify.aws/cli/graphql-transformer/codegen/) with the `API ID` of AppSync Grpahql Endpoint from the console. Execute the following command accepting all defaults:

   ```
   amplify add codegen --apiId xxxxxxxxxxxxxxxxxxxxxx
   ```
5. Verify that **graphql** folder is created inside **src** folder, containing following files:
   ```
   queries.js
   ```
6. Execute the application and access at http://localhost:3000:

    ```
    npm start
    ```
7. Now you can login to the react application with appropriate user credentials to query data from datalake with restricted access
