/*import { Stack, StackProps, aws_apigateway as apigw } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as fs from 'fs';
import * as path from 'path';

interface StageStackProps extends StackProps {
  restApiId: string;
  stageName: string;
}

export class StageStack extends Stack {
  constructor(scope: Construct, id: string, props: StageStackProps) {
    super(scope, id, props);

    console.log(`stageName : ${ props.stageName }`);

    const { restApiId, stageName } = props;

    const specPath = path.join(__dirname, '..', 'specs', `${stageName}.json`);
    const openApi = JSON.parse(fs.readFileSync(specPath, 'utf8'));

    console.log(`specPath : ${specPath}`);

    const deployment = new apigw.CfnDeployment(this, `Deployment-${stageName}`, {
      restApiId: restApiId,
      description: `${stageName} deployment`
    });

    new apigw.CfnStage(this, `Stage-${stageName}`, {
      restApiId: restApiId,
      deploymentId: deployment.ref,
      stageName: stageName,
      variables: {
        pointsUrl: `${stageName}.api.skechers.com`,
        contentfulUrl: `${stageName}.api.skechers.com`,
        usersUrl: `${stageName}.api.skechers.com`
      }
    });
  }
}
*/

/*
import {
  Stack,
  StackProps,
  aws_apigateway as apigw,
  aws_iam as iam,
  CustomResource,
  Duration,
  aws_lambda as lambda,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as fs from 'fs';
import * as path from 'path';

interface StageStackProps extends StackProps {
  restApiId: string;
  stageName: string;
}

export class StageStack extends Stack {
  constructor(scope: Construct, id: string, props: StageStackProps) {
    super(scope, id, props);

    const { restApiId, stageName } = props;

    const specPath = path.join(__dirname, '..', 'specs', `${stageName}.json`);
    const openApi = fs.readFileSync(specPath, 'utf8');

    const updaterFn = new lambda.Function(this, `ApiUpdater-${stageName}`, {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        const AWS = require('aws-sdk');
        const api = new AWS.APIGateway();
        exports.handler = async (event) => {
          const { RestApiId, Body } = event.ResourceProperties;
          await api.putRestApi({
            restApiId: RestApiId,
            mode: 'overwrite',
            body: Buffer.from(Body, 'utf-8')
          }).promise();
          return { PhysicalResourceId: RestApiId };
        };
      `),
      timeout: Duration.minutes(2),
    });

    updaterFn.role?.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonAPIGatewayAdministrator'));

    const custom = new CustomResource(this, `OpenApiUpdater-${stageName}`, {
      serviceToken: updaterFn.functionArn,
      properties: {
        RestApiId: restApiId,
        Body: openApi,
      },
    });

    const deployment = new apigw.CfnDeployment(this, `Deployment-${stageName}`, {
      restApiId,
      description: `${stageName} deployment`,
    });
    deployment.node.addDependency(custom); // ensure update happens before deployment

    new apigw.CfnStage(this, `Stage-${stageName}`, {
      restApiId,
      deploymentId: deployment.ref,
      stageName,
      variables: {
        pointsUrl: `${stageName}.api.skechers.com`,
        contentfulUrl: `${stageName}.api.skechers.com`,
        usersUrl: `${stageName}.api.skechers.com`,
      },
    });
  }
}
*/

import { Stack, StackProps, aws_apigateway as apigw } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

interface StageStackProps extends StackProps {
  restApiId: string;
  stageName: string;
}

export class StageStack extends Stack {
  constructor(scope: Construct, id: string, props: StageStackProps) {
    super(scope, id, props);

    console.log(`stageName : ${ props.stageName }`);

    const { restApiId, stageName } = props;

    const specPath = path.join(__dirname, '..', 'specs', `${stageName}.json`);
    const specContent = fs.readFileSync(specPath, 'utf8');
    const specHash = crypto.createHash('sha256').update(specContent).digest('hex').substring(0, 8);


    console.log(`specPath : ${specPath}`);

    // Optional: write the updated OpenAPI spec to a file or log it if needed

    const deployment = new apigw.CfnDeployment(this, `Deployment-${stageName}-${specHash}`, {
      restApiId,
      description: `Deployment for ${stageName} (${specHash})`
    });

    new apigw.CfnStage(this, `Stage-${stageName}`, {
      restApiId,
      deploymentId: deployment.ref,
      stageName,
      variables: {
        pointsUrl: `${stageName}.api.skechers.com`,
        contentfulUrl: `${stageName}.api.skechers.com`,
        usersUrl: `${stageName}.api.skechers.com`
      }
    });
  }
}
