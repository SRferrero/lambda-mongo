# MongoDB with Serverless

## Requisites

You need 2 things here: - [MongoDB account](https://cloud.mongodb.com/) - [Aws account](https://console.aws.amazon.com/)

## Setup Moongo Atlas

When you have created the Mongo account you should create a new cluster with the default for AWS in this case (if you want, select the appropiate region).
After this step press connect (you probably will create a user in this step, that you will use in the handler.js file). This will provide tou with the connection string for your mongo cluster which you can add to the handler.js file. should look like the example provided there.

Here yout need a couple more settings in Network access and in Database Access:
Network access: add a new ip address (with allow access from anywhere checked, which will fill in 0.0.0.0/0).
Database access: Edit the user created and allow read and write or create a new one if you need.

## AWS setup

Create a group within IAM and add the following permissions (some of them may not be mandatory, you could fine grain the full access ones):
`AWSLambdaFullAccess`
`AmazonAPIGatewayAdministrator`
`AWSLambdaBasicExecutionRole`
`AWSCloudFormationFullAccess`

if this is not enough add `IAMFullAccess`

Also you need to add to your `.bashrc` or `.zshrc`

```
export AWS_ACCESS_KEY_ID=<your-key-here>
export AWS_SECRET_ACCESS_KEY=<your-secret-key-here>
```

## Setup:

I opted for npx to always have the latest version of serverless (we use this just to deploy), so you just need node 8+ installed and npm to run npm install on this project.
after cloning this repo:
run `npm install`
Change your credentials inside handler.js

Try for the firs time to run `npx serverless deploy`
You should see a url from where you can access the endpoint, this should print a log in your mongo cluster, inside collection. it should create a new one with the name logs within test db.

# Tips

Debugging:

- Go to the aws console, to lambda, you should see the service name (based on the serverless.yml name you wrote, in this case probably would be testing-aws-dev-logging) then to monitoring; or even in the online editor they check the compiled code and give you informational messages or errors.
- Check that the permissions are right for the AWS (those errors may popup mainly when deploying).
