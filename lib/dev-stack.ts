import { Stack, StackProps, aws_apigateway as apigw } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as fs from 'fs';
import * as path from 'path';

interface DevStackProps extends StackProps {
  restApiId: string;
  stageName: string;
}

export class DevStack extends Stack {
  constructor(scope: Construct, id: string, props: DevStackProps) {
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
