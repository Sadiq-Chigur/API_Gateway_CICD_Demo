"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StageStack = void 0;
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
const aws_cdk_lib_1 = require("aws-cdk-lib");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const crypto = __importStar(require("crypto"));
class StageStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        console.log(`stageName : ${props.stageName}`);
        const { restApiId, stageName } = props;
        const specPath = path.join(__dirname, '..', 'specs', `${stageName}.json`);
        const specContent = fs.readFileSync(specPath, 'utf8');
        const specHash = crypto.createHash('sha256').update(specContent).digest('hex').substring(0, 8);
        console.log(`specPath : ${specPath}`);
        // Optional: write the updated OpenAPI spec to a file or log it if needed
        const deployment = new aws_cdk_lib_1.aws_apigateway.CfnDeployment(this, `Deployment-${stageName}-${specHash}`, {
            restApiId,
            description: `Deployment for ${stageName} (${specHash})`
        });
        new aws_cdk_lib_1.aws_apigateway.CfnStage(this, `Stage-${stageName}`, {
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
exports.StageStack = StageStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhZ2luZy1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zdGFnaW5nLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXdDRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBMkVFO0FBRUYsNkNBQXlFO0FBRXpFLHVDQUF5QjtBQUN6QiwyQ0FBNkI7QUFDN0IsK0NBQWlDO0FBT2pDLE1BQWEsVUFBVyxTQUFRLG1CQUFLO0lBQ25DLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDOUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFnQixLQUFLLENBQUMsU0FBVSxFQUFFLENBQUMsQ0FBQztRQUVoRCxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxHQUFHLEtBQUssQ0FBQztRQUV2QyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEdBQUcsU0FBUyxPQUFPLENBQUMsQ0FBQztRQUMxRSxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN0RCxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUcvRixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUV0Qyx5RUFBeUU7UUFFekUsTUFBTSxVQUFVLEdBQUcsSUFBSSw0QkFBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsY0FBYyxTQUFTLElBQUksUUFBUSxFQUFFLEVBQUU7WUFDdEYsU0FBUztZQUNULFdBQVcsRUFBRSxrQkFBa0IsU0FBUyxLQUFLLFFBQVEsR0FBRztTQUN6RCxDQUFDLENBQUM7UUFFSCxJQUFJLDRCQUFLLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxTQUFTLFNBQVMsRUFBRSxFQUFFO1lBQzdDLFNBQVM7WUFDVCxZQUFZLEVBQUUsVUFBVSxDQUFDLEdBQUc7WUFDNUIsU0FBUztZQUNULFNBQVMsRUFBRTtnQkFDVCxTQUFTLEVBQUUsR0FBRyxTQUFTLG1CQUFtQjtnQkFDMUMsYUFBYSxFQUFFLEdBQUcsU0FBUyxtQkFBbUI7Z0JBQzlDLFFBQVEsRUFBRSxHQUFHLFNBQVMsbUJBQW1CO2FBQzFDO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBakNELGdDQWlDQyIsInNvdXJjZXNDb250ZW50IjpbIi8qaW1wb3J0IHsgU3RhY2ssIFN0YWNrUHJvcHMsIGF3c19hcGlnYXRld2F5IGFzIGFwaWd3IH0gZnJvbSAnYXdzLWNkay1saWInO1xyXG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcclxuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuaW50ZXJmYWNlIFN0YWdlU3RhY2tQcm9wcyBleHRlbmRzIFN0YWNrUHJvcHMge1xyXG4gIHJlc3RBcGlJZDogc3RyaW5nO1xyXG4gIHN0YWdlTmFtZTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3RhZ2VTdGFjayBleHRlbmRzIFN0YWNrIHtcclxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogU3RhZ2VTdGFja1Byb3BzKSB7XHJcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhgc3RhZ2VOYW1lIDogJHsgcHJvcHMuc3RhZ2VOYW1lIH1gKTtcclxuXHJcbiAgICBjb25zdCB7IHJlc3RBcGlJZCwgc3RhZ2VOYW1lIH0gPSBwcm9wcztcclxuXHJcbiAgICBjb25zdCBzcGVjUGF0aCA9IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLicsICdzcGVjcycsIGAke3N0YWdlTmFtZX0uanNvbmApO1xyXG4gICAgY29uc3Qgb3BlbkFwaSA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHNwZWNQYXRoLCAndXRmOCcpKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhgc3BlY1BhdGggOiAke3NwZWNQYXRofWApO1xyXG5cclxuICAgIGNvbnN0IGRlcGxveW1lbnQgPSBuZXcgYXBpZ3cuQ2ZuRGVwbG95bWVudCh0aGlzLCBgRGVwbG95bWVudC0ke3N0YWdlTmFtZX1gLCB7XHJcbiAgICAgIHJlc3RBcGlJZDogcmVzdEFwaUlkLFxyXG4gICAgICBkZXNjcmlwdGlvbjogYCR7c3RhZ2VOYW1lfSBkZXBsb3ltZW50YFxyXG4gICAgfSk7XHJcblxyXG4gICAgbmV3IGFwaWd3LkNmblN0YWdlKHRoaXMsIGBTdGFnZS0ke3N0YWdlTmFtZX1gLCB7XHJcbiAgICAgIHJlc3RBcGlJZDogcmVzdEFwaUlkLFxyXG4gICAgICBkZXBsb3ltZW50SWQ6IGRlcGxveW1lbnQucmVmLFxyXG4gICAgICBzdGFnZU5hbWU6IHN0YWdlTmFtZSxcclxuICAgICAgdmFyaWFibGVzOiB7XHJcbiAgICAgICAgcG9pbnRzVXJsOiBgJHtzdGFnZU5hbWV9LmFwaS5za2VjaGVycy5jb21gLFxyXG4gICAgICAgIGNvbnRlbnRmdWxVcmw6IGAke3N0YWdlTmFtZX0uYXBpLnNrZWNoZXJzLmNvbWAsXHJcbiAgICAgICAgdXNlcnNVcmw6IGAke3N0YWdlTmFtZX0uYXBpLnNrZWNoZXJzLmNvbWBcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiovXHJcblxyXG4vKlxyXG5pbXBvcnQge1xyXG4gIFN0YWNrLFxyXG4gIFN0YWNrUHJvcHMsXHJcbiAgYXdzX2FwaWdhdGV3YXkgYXMgYXBpZ3csXHJcbiAgYXdzX2lhbSBhcyBpYW0sXHJcbiAgQ3VzdG9tUmVzb3VyY2UsXHJcbiAgRHVyYXRpb24sXHJcbiAgYXdzX2xhbWJkYSBhcyBsYW1iZGEsXHJcbn0gZnJvbSAnYXdzLWNkay1saWInO1xyXG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcclxuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuaW50ZXJmYWNlIFN0YWdlU3RhY2tQcm9wcyBleHRlbmRzIFN0YWNrUHJvcHMge1xyXG4gIHJlc3RBcGlJZDogc3RyaW5nO1xyXG4gIHN0YWdlTmFtZTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3RhZ2VTdGFjayBleHRlbmRzIFN0YWNrIHtcclxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogU3RhZ2VTdGFja1Byb3BzKSB7XHJcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcclxuXHJcbiAgICBjb25zdCB7IHJlc3RBcGlJZCwgc3RhZ2VOYW1lIH0gPSBwcm9wcztcclxuXHJcbiAgICBjb25zdCBzcGVjUGF0aCA9IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLicsICdzcGVjcycsIGAke3N0YWdlTmFtZX0uanNvbmApO1xyXG4gICAgY29uc3Qgb3BlbkFwaSA9IGZzLnJlYWRGaWxlU3luYyhzcGVjUGF0aCwgJ3V0ZjgnKTtcclxuXHJcbiAgICBjb25zdCB1cGRhdGVyRm4gPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsIGBBcGlVcGRhdGVyLSR7c3RhZ2VOYW1lfWAsIHtcclxuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzE4X1gsXHJcbiAgICAgIGhhbmRsZXI6ICdpbmRleC5oYW5kbGVyJyxcclxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUlubGluZShgXHJcbiAgICAgICAgY29uc3QgQVdTID0gcmVxdWlyZSgnYXdzLXNkaycpO1xyXG4gICAgICAgIGNvbnN0IGFwaSA9IG5ldyBBV1MuQVBJR2F0ZXdheSgpO1xyXG4gICAgICAgIGV4cG9ydHMuaGFuZGxlciA9IGFzeW5jIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgeyBSZXN0QXBpSWQsIEJvZHkgfSA9IGV2ZW50LlJlc291cmNlUHJvcGVydGllcztcclxuICAgICAgICAgIGF3YWl0IGFwaS5wdXRSZXN0QXBpKHtcclxuICAgICAgICAgICAgcmVzdEFwaUlkOiBSZXN0QXBpSWQsXHJcbiAgICAgICAgICAgIG1vZGU6ICdvdmVyd3JpdGUnLFxyXG4gICAgICAgICAgICBib2R5OiBCdWZmZXIuZnJvbShCb2R5LCAndXRmLTgnKVxyXG4gICAgICAgICAgfSkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgcmV0dXJuIHsgUGh5c2ljYWxSZXNvdXJjZUlkOiBSZXN0QXBpSWQgfTtcclxuICAgICAgICB9O1xyXG4gICAgICBgKSxcclxuICAgICAgdGltZW91dDogRHVyYXRpb24ubWludXRlcygyKSxcclxuICAgIH0pO1xyXG5cclxuICAgIHVwZGF0ZXJGbi5yb2xlPy5hZGRNYW5hZ2VkUG9saWN5KGlhbS5NYW5hZ2VkUG9saWN5LmZyb21Bd3NNYW5hZ2VkUG9saWN5TmFtZSgnQW1hem9uQVBJR2F0ZXdheUFkbWluaXN0cmF0b3InKSk7XHJcblxyXG4gICAgY29uc3QgY3VzdG9tID0gbmV3IEN1c3RvbVJlc291cmNlKHRoaXMsIGBPcGVuQXBpVXBkYXRlci0ke3N0YWdlTmFtZX1gLCB7XHJcbiAgICAgIHNlcnZpY2VUb2tlbjogdXBkYXRlckZuLmZ1bmN0aW9uQXJuLFxyXG4gICAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgUmVzdEFwaUlkOiByZXN0QXBpSWQsXHJcbiAgICAgICAgQm9keTogb3BlbkFwaSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGRlcGxveW1lbnQgPSBuZXcgYXBpZ3cuQ2ZuRGVwbG95bWVudCh0aGlzLCBgRGVwbG95bWVudC0ke3N0YWdlTmFtZX1gLCB7XHJcbiAgICAgIHJlc3RBcGlJZCxcclxuICAgICAgZGVzY3JpcHRpb246IGAke3N0YWdlTmFtZX0gZGVwbG95bWVudGAsXHJcbiAgICB9KTtcclxuICAgIGRlcGxveW1lbnQubm9kZS5hZGREZXBlbmRlbmN5KGN1c3RvbSk7IC8vIGVuc3VyZSB1cGRhdGUgaGFwcGVucyBiZWZvcmUgZGVwbG95bWVudFxyXG5cclxuICAgIG5ldyBhcGlndy5DZm5TdGFnZSh0aGlzLCBgU3RhZ2UtJHtzdGFnZU5hbWV9YCwge1xyXG4gICAgICByZXN0QXBpSWQsXHJcbiAgICAgIGRlcGxveW1lbnRJZDogZGVwbG95bWVudC5yZWYsXHJcbiAgICAgIHN0YWdlTmFtZSxcclxuICAgICAgdmFyaWFibGVzOiB7XHJcbiAgICAgICAgcG9pbnRzVXJsOiBgJHtzdGFnZU5hbWV9LmFwaS5za2VjaGVycy5jb21gLFxyXG4gICAgICAgIGNvbnRlbnRmdWxVcmw6IGAke3N0YWdlTmFtZX0uYXBpLnNrZWNoZXJzLmNvbWAsXHJcbiAgICAgICAgdXNlcnNVcmw6IGAke3N0YWdlTmFtZX0uYXBpLnNrZWNoZXJzLmNvbWAsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuKi9cclxuXHJcbmltcG9ydCB7IFN0YWNrLCBTdGFja1Byb3BzLCBhd3NfYXBpZ2F0ZXdheSBhcyBhcGlndyB9IGZyb20gJ2F3cy1jZGstbGliJztcclxuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XHJcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcclxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0ICogYXMgY3J5cHRvIGZyb20gJ2NyeXB0byc7XHJcblxyXG5pbnRlcmZhY2UgU3RhZ2VTdGFja1Byb3BzIGV4dGVuZHMgU3RhY2tQcm9wcyB7XHJcbiAgcmVzdEFwaUlkOiBzdHJpbmc7XHJcbiAgc3RhZ2VOYW1lOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdGFnZVN0YWNrIGV4dGVuZHMgU3RhY2sge1xyXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBTdGFnZVN0YWNrUHJvcHMpIHtcclxuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKGBzdGFnZU5hbWUgOiAkeyBwcm9wcy5zdGFnZU5hbWUgfWApO1xyXG5cclxuICAgIGNvbnN0IHsgcmVzdEFwaUlkLCBzdGFnZU5hbWUgfSA9IHByb3BzO1xyXG5cclxuICAgIGNvbnN0IHNwZWNQYXRoID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJywgJ3NwZWNzJywgYCR7c3RhZ2VOYW1lfS5qc29uYCk7XHJcbiAgICBjb25zdCBzcGVjQ29udGVudCA9IGZzLnJlYWRGaWxlU3luYyhzcGVjUGF0aCwgJ3V0ZjgnKTtcclxuICAgIGNvbnN0IHNwZWNIYXNoID0gY3J5cHRvLmNyZWF0ZUhhc2goJ3NoYTI1NicpLnVwZGF0ZShzcGVjQ29udGVudCkuZGlnZXN0KCdoZXgnKS5zdWJzdHJpbmcoMCwgOCk7XHJcblxyXG5cclxuICAgIGNvbnNvbGUubG9nKGBzcGVjUGF0aCA6ICR7c3BlY1BhdGh9YCk7XHJcblxyXG4gICAgLy8gT3B0aW9uYWw6IHdyaXRlIHRoZSB1cGRhdGVkIE9wZW5BUEkgc3BlYyB0byBhIGZpbGUgb3IgbG9nIGl0IGlmIG5lZWRlZFxyXG5cclxuICAgIGNvbnN0IGRlcGxveW1lbnQgPSBuZXcgYXBpZ3cuQ2ZuRGVwbG95bWVudCh0aGlzLCBgRGVwbG95bWVudC0ke3N0YWdlTmFtZX0tJHtzcGVjSGFzaH1gLCB7XHJcbiAgICAgIHJlc3RBcGlJZCxcclxuICAgICAgZGVzY3JpcHRpb246IGBEZXBsb3ltZW50IGZvciAke3N0YWdlTmFtZX0gKCR7c3BlY0hhc2h9KWBcclxuICAgIH0pO1xyXG5cclxuICAgIG5ldyBhcGlndy5DZm5TdGFnZSh0aGlzLCBgU3RhZ2UtJHtzdGFnZU5hbWV9YCwge1xyXG4gICAgICByZXN0QXBpSWQsXHJcbiAgICAgIGRlcGxveW1lbnRJZDogZGVwbG95bWVudC5yZWYsXHJcbiAgICAgIHN0YWdlTmFtZSxcclxuICAgICAgdmFyaWFibGVzOiB7XHJcbiAgICAgICAgcG9pbnRzVXJsOiBgJHtzdGFnZU5hbWV9LmFwaS5za2VjaGVycy5jb21gLFxyXG4gICAgICAgIGNvbnRlbnRmdWxVcmw6IGAke3N0YWdlTmFtZX0uYXBpLnNrZWNoZXJzLmNvbWAsXHJcbiAgICAgICAgdXNlcnNVcmw6IGAke3N0YWdlTmFtZX0uYXBpLnNrZWNoZXJzLmNvbWBcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==