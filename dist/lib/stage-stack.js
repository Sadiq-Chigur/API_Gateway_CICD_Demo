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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhZ2Utc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc3RhZ2Utc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBd0NFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUEyRUU7QUFFRiw2Q0FBeUU7QUFFekUsdUNBQXlCO0FBQ3pCLDJDQUE2QjtBQUM3QiwrQ0FBaUM7QUFPakMsTUFBYSxVQUFXLFNBQVEsbUJBQUs7SUFDbkMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM5RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWdCLEtBQUssQ0FBQyxTQUFVLEVBQUUsQ0FBQyxDQUFDO1FBRWhELE1BQU0sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBRXZDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsR0FBRyxTQUFTLE9BQU8sQ0FBQyxDQUFDO1FBQzFFLE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3RELE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRy9GLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBRXRDLHlFQUF5RTtRQUV6RSxNQUFNLFVBQVUsR0FBRyxJQUFJLDRCQUFLLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxjQUFjLFNBQVMsSUFBSSxRQUFRLEVBQUUsRUFBRTtZQUN0RixTQUFTO1lBQ1QsV0FBVyxFQUFFLGtCQUFrQixTQUFTLEtBQUssUUFBUSxHQUFHO1NBQ3pELENBQUMsQ0FBQztRQUVILElBQUksNEJBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFNBQVMsU0FBUyxFQUFFLEVBQUU7WUFDN0MsU0FBUztZQUNULFlBQVksRUFBRSxVQUFVLENBQUMsR0FBRztZQUM1QixTQUFTO1lBQ1QsU0FBUyxFQUFFO2dCQUNULFNBQVMsRUFBRSxHQUFHLFNBQVMsbUJBQW1CO2dCQUMxQyxhQUFhLEVBQUUsR0FBRyxTQUFTLG1CQUFtQjtnQkFDOUMsUUFBUSxFQUFFLEdBQUcsU0FBUyxtQkFBbUI7YUFDMUM7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFqQ0QsZ0NBaUNDIiwic291cmNlc0NvbnRlbnQiOlsiLyppbXBvcnQgeyBTdGFjaywgU3RhY2tQcm9wcywgYXdzX2FwaWdhdGV3YXkgYXMgYXBpZ3cgfSBmcm9tICdhd3MtY2RrLWxpYic7XHJcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xyXG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XHJcblxyXG5pbnRlcmZhY2UgU3RhZ2VTdGFja1Byb3BzIGV4dGVuZHMgU3RhY2tQcm9wcyB7XHJcbiAgcmVzdEFwaUlkOiBzdHJpbmc7XHJcbiAgc3RhZ2VOYW1lOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdGFnZVN0YWNrIGV4dGVuZHMgU3RhY2sge1xyXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBTdGFnZVN0YWNrUHJvcHMpIHtcclxuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKGBzdGFnZU5hbWUgOiAkeyBwcm9wcy5zdGFnZU5hbWUgfWApO1xyXG5cclxuICAgIGNvbnN0IHsgcmVzdEFwaUlkLCBzdGFnZU5hbWUgfSA9IHByb3BzO1xyXG5cclxuICAgIGNvbnN0IHNwZWNQYXRoID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJywgJ3NwZWNzJywgYCR7c3RhZ2VOYW1lfS5qc29uYCk7XHJcbiAgICBjb25zdCBvcGVuQXBpID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoc3BlY1BhdGgsICd1dGY4JykpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKGBzcGVjUGF0aCA6ICR7c3BlY1BhdGh9YCk7XHJcblxyXG4gICAgY29uc3QgZGVwbG95bWVudCA9IG5ldyBhcGlndy5DZm5EZXBsb3ltZW50KHRoaXMsIGBEZXBsb3ltZW50LSR7c3RhZ2VOYW1lfWAsIHtcclxuICAgICAgcmVzdEFwaUlkOiByZXN0QXBpSWQsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiBgJHtzdGFnZU5hbWV9IGRlcGxveW1lbnRgXHJcbiAgICB9KTtcclxuXHJcbiAgICBuZXcgYXBpZ3cuQ2ZuU3RhZ2UodGhpcywgYFN0YWdlLSR7c3RhZ2VOYW1lfWAsIHtcclxuICAgICAgcmVzdEFwaUlkOiByZXN0QXBpSWQsXHJcbiAgICAgIGRlcGxveW1lbnRJZDogZGVwbG95bWVudC5yZWYsXHJcbiAgICAgIHN0YWdlTmFtZTogc3RhZ2VOYW1lLFxyXG4gICAgICB2YXJpYWJsZXM6IHtcclxuICAgICAgICBwb2ludHNVcmw6IGAke3N0YWdlTmFtZX0uYXBpLnNrZWNoZXJzLmNvbWAsXHJcbiAgICAgICAgY29udGVudGZ1bFVybDogYCR7c3RhZ2VOYW1lfS5hcGkuc2tlY2hlcnMuY29tYCxcclxuICAgICAgICB1c2Vyc1VybDogYCR7c3RhZ2VOYW1lfS5hcGkuc2tlY2hlcnMuY29tYFxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuKi9cclxuXHJcbi8qXHJcbmltcG9ydCB7XHJcbiAgU3RhY2ssXHJcbiAgU3RhY2tQcm9wcyxcclxuICBhd3NfYXBpZ2F0ZXdheSBhcyBhcGlndyxcclxuICBhd3NfaWFtIGFzIGlhbSxcclxuICBDdXN0b21SZXNvdXJjZSxcclxuICBEdXJhdGlvbixcclxuICBhd3NfbGFtYmRhIGFzIGxhbWJkYSxcclxufSBmcm9tICdhd3MtY2RrLWxpYic7XHJcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xyXG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XHJcblxyXG5pbnRlcmZhY2UgU3RhZ2VTdGFja1Byb3BzIGV4dGVuZHMgU3RhY2tQcm9wcyB7XHJcbiAgcmVzdEFwaUlkOiBzdHJpbmc7XHJcbiAgc3RhZ2VOYW1lOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdGFnZVN0YWNrIGV4dGVuZHMgU3RhY2sge1xyXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBTdGFnZVN0YWNrUHJvcHMpIHtcclxuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xyXG5cclxuICAgIGNvbnN0IHsgcmVzdEFwaUlkLCBzdGFnZU5hbWUgfSA9IHByb3BzO1xyXG5cclxuICAgIGNvbnN0IHNwZWNQYXRoID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJywgJ3NwZWNzJywgYCR7c3RhZ2VOYW1lfS5qc29uYCk7XHJcbiAgICBjb25zdCBvcGVuQXBpID0gZnMucmVhZEZpbGVTeW5jKHNwZWNQYXRoLCAndXRmOCcpO1xyXG5cclxuICAgIGNvbnN0IHVwZGF0ZXJGbiA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgYEFwaVVwZGF0ZXItJHtzdGFnZU5hbWV9YCwge1xyXG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMThfWCxcclxuICAgICAgaGFuZGxlcjogJ2luZGV4LmhhbmRsZXInLFxyXG4gICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tSW5saW5lKGBcclxuICAgICAgICBjb25zdCBBV1MgPSByZXF1aXJlKCdhd3Mtc2RrJyk7XHJcbiAgICAgICAgY29uc3QgYXBpID0gbmV3IEFXUy5BUElHYXRld2F5KCk7XHJcbiAgICAgICAgZXhwb3J0cy5oYW5kbGVyID0gYXN5bmMgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB7IFJlc3RBcGlJZCwgQm9keSB9ID0gZXZlbnQuUmVzb3VyY2VQcm9wZXJ0aWVzO1xyXG4gICAgICAgICAgYXdhaXQgYXBpLnB1dFJlc3RBcGkoe1xyXG4gICAgICAgICAgICByZXN0QXBpSWQ6IFJlc3RBcGlJZCxcclxuICAgICAgICAgICAgbW9kZTogJ292ZXJ3cml0ZScsXHJcbiAgICAgICAgICAgIGJvZHk6IEJ1ZmZlci5mcm9tKEJvZHksICd1dGYtOCcpXHJcbiAgICAgICAgICB9KS5wcm9taXNlKCk7XHJcbiAgICAgICAgICByZXR1cm4geyBQaHlzaWNhbFJlc291cmNlSWQ6IFJlc3RBcGlJZCB9O1xyXG4gICAgICAgIH07XHJcbiAgICAgIGApLFxyXG4gICAgICB0aW1lb3V0OiBEdXJhdGlvbi5taW51dGVzKDIpLFxyXG4gICAgfSk7XHJcblxyXG4gICAgdXBkYXRlckZuLnJvbGU/LmFkZE1hbmFnZWRQb2xpY3koaWFtLk1hbmFnZWRQb2xpY3kuZnJvbUF3c01hbmFnZWRQb2xpY3lOYW1lKCdBbWF6b25BUElHYXRld2F5QWRtaW5pc3RyYXRvcicpKTtcclxuXHJcbiAgICBjb25zdCBjdXN0b20gPSBuZXcgQ3VzdG9tUmVzb3VyY2UodGhpcywgYE9wZW5BcGlVcGRhdGVyLSR7c3RhZ2VOYW1lfWAsIHtcclxuICAgICAgc2VydmljZVRva2VuOiB1cGRhdGVyRm4uZnVuY3Rpb25Bcm4sXHJcbiAgICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBSZXN0QXBpSWQ6IHJlc3RBcGlJZCxcclxuICAgICAgICBCb2R5OiBvcGVuQXBpLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgZGVwbG95bWVudCA9IG5ldyBhcGlndy5DZm5EZXBsb3ltZW50KHRoaXMsIGBEZXBsb3ltZW50LSR7c3RhZ2VOYW1lfWAsIHtcclxuICAgICAgcmVzdEFwaUlkLFxyXG4gICAgICBkZXNjcmlwdGlvbjogYCR7c3RhZ2VOYW1lfSBkZXBsb3ltZW50YCxcclxuICAgIH0pO1xyXG4gICAgZGVwbG95bWVudC5ub2RlLmFkZERlcGVuZGVuY3koY3VzdG9tKTsgLy8gZW5zdXJlIHVwZGF0ZSBoYXBwZW5zIGJlZm9yZSBkZXBsb3ltZW50XHJcblxyXG4gICAgbmV3IGFwaWd3LkNmblN0YWdlKHRoaXMsIGBTdGFnZS0ke3N0YWdlTmFtZX1gLCB7XHJcbiAgICAgIHJlc3RBcGlJZCxcclxuICAgICAgZGVwbG95bWVudElkOiBkZXBsb3ltZW50LnJlZixcclxuICAgICAgc3RhZ2VOYW1lLFxyXG4gICAgICB2YXJpYWJsZXM6IHtcclxuICAgICAgICBwb2ludHNVcmw6IGAke3N0YWdlTmFtZX0uYXBpLnNrZWNoZXJzLmNvbWAsXHJcbiAgICAgICAgY29udGVudGZ1bFVybDogYCR7c3RhZ2VOYW1lfS5hcGkuc2tlY2hlcnMuY29tYCxcclxuICAgICAgICB1c2Vyc1VybDogYCR7c3RhZ2VOYW1lfS5hcGkuc2tlY2hlcnMuY29tYCxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4qL1xyXG5cclxuaW1wb3J0IHsgU3RhY2ssIFN0YWNrUHJvcHMsIGF3c19hcGlnYXRld2F5IGFzIGFwaWd3IH0gZnJvbSAnYXdzLWNkay1saWInO1xyXG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcclxuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgKiBhcyBjcnlwdG8gZnJvbSAnY3J5cHRvJztcclxuXHJcbmludGVyZmFjZSBTdGFnZVN0YWNrUHJvcHMgZXh0ZW5kcyBTdGFja1Byb3BzIHtcclxuICByZXN0QXBpSWQ6IHN0cmluZztcclxuICBzdGFnZU5hbWU6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN0YWdlU3RhY2sgZXh0ZW5kcyBTdGFjayB7XHJcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IFN0YWdlU3RhY2tQcm9wcykge1xyXG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XHJcblxyXG4gICAgY29uc29sZS5sb2coYHN0YWdlTmFtZSA6ICR7IHByb3BzLnN0YWdlTmFtZSB9YCk7XHJcblxyXG4gICAgY29uc3QgeyByZXN0QXBpSWQsIHN0YWdlTmFtZSB9ID0gcHJvcHM7XHJcblxyXG4gICAgY29uc3Qgc3BlY1BhdGggPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4nLCAnc3BlY3MnLCBgJHtzdGFnZU5hbWV9Lmpzb25gKTtcclxuICAgIGNvbnN0IHNwZWNDb250ZW50ID0gZnMucmVhZEZpbGVTeW5jKHNwZWNQYXRoLCAndXRmOCcpO1xyXG4gICAgY29uc3Qgc3BlY0hhc2ggPSBjcnlwdG8uY3JlYXRlSGFzaCgnc2hhMjU2JykudXBkYXRlKHNwZWNDb250ZW50KS5kaWdlc3QoJ2hleCcpLnN1YnN0cmluZygwLCA4KTtcclxuXHJcblxyXG4gICAgY29uc29sZS5sb2coYHNwZWNQYXRoIDogJHtzcGVjUGF0aH1gKTtcclxuXHJcbiAgICAvLyBPcHRpb25hbDogd3JpdGUgdGhlIHVwZGF0ZWQgT3BlbkFQSSBzcGVjIHRvIGEgZmlsZSBvciBsb2cgaXQgaWYgbmVlZGVkXHJcblxyXG4gICAgY29uc3QgZGVwbG95bWVudCA9IG5ldyBhcGlndy5DZm5EZXBsb3ltZW50KHRoaXMsIGBEZXBsb3ltZW50LSR7c3RhZ2VOYW1lfS0ke3NwZWNIYXNofWAsIHtcclxuICAgICAgcmVzdEFwaUlkLFxyXG4gICAgICBkZXNjcmlwdGlvbjogYERlcGxveW1lbnQgZm9yICR7c3RhZ2VOYW1lfSAoJHtzcGVjSGFzaH0pYFxyXG4gICAgfSk7XHJcblxyXG4gICAgbmV3IGFwaWd3LkNmblN0YWdlKHRoaXMsIGBTdGFnZS0ke3N0YWdlTmFtZX1gLCB7XHJcbiAgICAgIHJlc3RBcGlJZCxcclxuICAgICAgZGVwbG95bWVudElkOiBkZXBsb3ltZW50LnJlZixcclxuICAgICAgc3RhZ2VOYW1lLFxyXG4gICAgICB2YXJpYWJsZXM6IHtcclxuICAgICAgICBwb2ludHNVcmw6IGAke3N0YWdlTmFtZX0uYXBpLnNrZWNoZXJzLmNvbWAsXHJcbiAgICAgICAgY29udGVudGZ1bFVybDogYCR7c3RhZ2VOYW1lfS5hcGkuc2tlY2hlcnMuY29tYCxcclxuICAgICAgICB1c2Vyc1VybDogYCR7c3RhZ2VOYW1lfS5hcGkuc2tlY2hlcnMuY29tYFxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19