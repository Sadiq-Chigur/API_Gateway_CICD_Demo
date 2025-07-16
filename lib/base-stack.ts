import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class BaseStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new apigateway.SpecRestApi(this, 'SharedApiGateway', {
      apiDefinition: apigateway.ApiDefinition.fromInline({
        openapi: '3.0.1',
        info: { title: 'Shared API', version: 'v1' },
        paths: {},
      }),
      deploy: false,
      restApiName: 'Shared-API-Gateway',
    });
  }
}
