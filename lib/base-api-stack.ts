import { Stack, StackProps, aws_apigateway as apigw, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as fs from 'fs';
import * as path from 'path';

export class BaseApiStack extends Stack {
  public readonly restApiId: string;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const openApi = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'specs', 'dev.json'), 'utf8'));
    console.log(`openApi : ${openApi}`);
    
    const restApi = new apigw.CfnRestApi(this, 'BaseRestApi', {
      name: 'LoyaltyApiGateway-V2',
      description: 'Main API Gateway shared across stages',
      body: openApi,
      failOnWarnings: true,
      endpointConfiguration: {
        types: ['REGIONAL']
      }
    });
    console.log(`restApi : ${restApi}`);
    this.restApiId = restApi.ref;

    new CfnOutput(this, 'RestApiId', {
      value: this.restApiId,
      exportName: 'SharedApiGatewayId'
    });
  }
}
