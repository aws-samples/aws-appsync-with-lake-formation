const appConfig = {
  Auth: {
    region: "us-east-1",
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_CLIENT_ID,
  },
  aws_appsync_graphqlEndpoint: process.env.REACT_APP_APPSYNC_URL,
  aws_appsync_region: "us-east-1",
  // aws_appsync_authenticationType: "API_KEY",
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
  aws_appsync_apiKey: process.env.REACT_APP_APPSYNC_API_KEY,
};

export default appConfig;
