#!/usr/bin/env node
"use strict";
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
const cdk = __importStar(require("aws-cdk-lib"));
const base_api_stack_1 = require("../lib/base-api-stack");
const staging_stack_1 = require("../lib/staging-stack");
const app = new cdk.App();
const envName = app.node.tryGetContext('env'); // pass with -c env=dev
console.log(`Environment: ${envName}`);
if (!envName)
    throw new Error('Must pass -c env=dev|staging|prod');
if (envName === 'base') {
    console.log(`Environmentin if part of base : ${envName}`);
    new base_api_stack_1.BaseApiStack(app, 'ApiGatewayBaseStack', {
        env: { region: 'us-east-1' }
    });
}
else if (['dev', 'staging', 'prod'].includes(envName)) {
    console.log(`Environment in else part : ${envName}`);
    new staging_stack_1.StageStack(app, `ApiGatewayStage-${envName}`, {
        env: { region: 'us-east-1' },
        restApiId: cdk.Fn.importValue('SharedApiGatewayId'),
        stageName: envName
    });
}
else {
    throw new Error(`Unknown environment: ${envName}`);
}
/*} else {
  console.log(`Environment in else part : ${envName}`);
  const restApiId = cdk.Fn.importValue('SharedApiGatewayId');
  new StageStack(app, `ApiGatewayStage-${envName}`, {
    env: { region: 'us-east-1' },
    restApiId,
    stageName: envName
  });
}*/
/*
import * as cdk from 'aws-cdk-lib';
import { BaseStack } from '../lib/base-stack';
import { EnvStageStack } from '../lib/env-stage-stack';

const app = new cdk.App();
const env = app.node.tryGetContext('env');

if (!env) throw new Error("Context variable 'env' is required. Use: cdk deploy -c env=dev");

if (env === 'base') {
  new BaseStack(app, 'ApiGwSharedStack');
} else {
  new EnvStageStack(app, `EnvStageStack-${env}`, {
  env: { account, region },
  stage: env,
  api: sharedApi.api, // this assumes sharedApi exposes the API as `.api`
  stageVars: {
    pointsUrl: 'mock.service.internal',       // replace with actual per-env values
    contentfulUrl: 'mock.content.internal',
    usersUrl: 'mock.users.internal',
  },
});
}
*/
/*
import * as cdk from 'aws-cdk-lib';
import { BaseStack } from '../lib/base-stack';
import { EnvStageStack } from '../lib/env-stage-stack';

const app = new cdk.App();
const env = app.node.tryGetContext('env');

if (!env) throw new Error("Context variable 'env' is required. Use: cdk deploy -c env=dev");

if (env === 'base') {
  new BaseStack(app, 'ApiGwSharedStack');
} else {
  new EnvStageStack(app, `ApiGw-${env}-StageStack`, { stageName: env });
}
*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpX2dhdGV3YXlfY2ljZF9kZW1vLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vYmluL2FwaV9nYXRld2F5X2NpY2RfZGVtby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLGlEQUFtQztBQUNuQywwREFBcUQ7QUFDckQsd0RBQWtEO0FBR2xELE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzFCLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsdUJBQXVCO0FBRXRFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLE9BQU8sRUFBRSxDQUFDLENBQUM7QUFFdkMsSUFBSSxDQUFDLE9BQU87SUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7QUFFbkUsSUFBSSxPQUFPLEtBQUssTUFBTSxFQUFFLENBQUM7SUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUMxRCxJQUFJLDZCQUFZLENBQUMsR0FBRyxFQUFFLHFCQUFxQixFQUFFO1FBQzNDLEdBQUcsRUFBRSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUU7S0FDN0IsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztLQUFNLElBQUksQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO0lBQ3hELE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDckQsSUFBSSwwQkFBVSxDQUFDLEdBQUcsRUFBRSxtQkFBbUIsT0FBTyxFQUFFLEVBQUU7UUFDaEQsR0FBRyxFQUFFLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRTtRQUM1QixTQUFTLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsb0JBQW9CLENBQUM7UUFDbkQsU0FBUyxFQUFFLE9BQU87S0FDbkIsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztLQUFNLENBQUM7SUFDTixNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQ3JELENBQUM7QUFDRDs7Ozs7Ozs7R0FRRztBQUdIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUF3QkU7QUFFRjs7Ozs7Ozs7Ozs7Ozs7O0VBZUUiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXHJcblxyXG5pbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xyXG5pbXBvcnQgeyBCYXNlQXBpU3RhY2sgfSBmcm9tICcuLi9saWIvYmFzZS1hcGktc3RhY2snO1xyXG5pbXBvcnQgeyBTdGFnZVN0YWNrIH0gZnJvbSAnLi4vbGliL3N0YWdpbmctc3RhY2snO1xyXG5pbXBvcnQgeyBEZXZTdGFjayB9IGZyb20gJy4uL2xpYi9kZXYtc3RhY2snO1xyXG5cclxuY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcclxuY29uc3QgZW52TmFtZSA9IGFwcC5ub2RlLnRyeUdldENvbnRleHQoJ2VudicpOyAvLyBwYXNzIHdpdGggLWMgZW52PWRldlxyXG5cclxuY29uc29sZS5sb2coYEVudmlyb25tZW50OiAke2Vudk5hbWV9YCk7XHJcblxyXG5pZiAoIWVudk5hbWUpIHRocm93IG5ldyBFcnJvcignTXVzdCBwYXNzIC1jIGVudj1kZXZ8c3RhZ2luZ3xwcm9kJyk7XHJcblxyXG5pZiAoZW52TmFtZSA9PT0gJ2Jhc2UnKSB7XHJcbiAgY29uc29sZS5sb2coYEVudmlyb25tZW50aW4gaWYgcGFydCBvZiBiYXNlIDogJHtlbnZOYW1lfWApO1xyXG4gIG5ldyBCYXNlQXBpU3RhY2soYXBwLCAnQXBpR2F0ZXdheUJhc2VTdGFjaycsIHtcclxuICAgIGVudjogeyByZWdpb246ICd1cy1lYXN0LTEnIH1cclxuICB9KTtcclxufSBlbHNlIGlmIChbJ2RldicsICdzdGFnaW5nJywgJ3Byb2QnXS5pbmNsdWRlcyhlbnZOYW1lKSkge1xyXG4gIGNvbnNvbGUubG9nKGBFbnZpcm9ubWVudCBpbiBlbHNlIHBhcnQgOiAke2Vudk5hbWV9YCk7XHJcbiAgbmV3IFN0YWdlU3RhY2soYXBwLCBgQXBpR2F0ZXdheVN0YWdlLSR7ZW52TmFtZX1gLCB7XHJcbiAgICBlbnY6IHsgcmVnaW9uOiAndXMtZWFzdC0xJyB9LFxyXG4gICAgcmVzdEFwaUlkOiBjZGsuRm4uaW1wb3J0VmFsdWUoJ1NoYXJlZEFwaUdhdGV3YXlJZCcpLFxyXG4gICAgc3RhZ2VOYW1lOiBlbnZOYW1lXHJcbiAgfSk7XHJcbn0gZWxzZSB7XHJcbiAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGVudmlyb25tZW50OiAke2Vudk5hbWV9YCk7XHJcbn1cclxuLyp9IGVsc2Uge1xyXG4gIGNvbnNvbGUubG9nKGBFbnZpcm9ubWVudCBpbiBlbHNlIHBhcnQgOiAke2Vudk5hbWV9YCk7XHJcbiAgY29uc3QgcmVzdEFwaUlkID0gY2RrLkZuLmltcG9ydFZhbHVlKCdTaGFyZWRBcGlHYXRld2F5SWQnKTtcclxuICBuZXcgU3RhZ2VTdGFjayhhcHAsIGBBcGlHYXRld2F5U3RhZ2UtJHtlbnZOYW1lfWAsIHtcclxuICAgIGVudjogeyByZWdpb246ICd1cy1lYXN0LTEnIH0sXHJcbiAgICByZXN0QXBpSWQsXHJcbiAgICBzdGFnZU5hbWU6IGVudk5hbWVcclxuICB9KTtcclxufSovXHJcblxyXG5cclxuLypcclxuaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcclxuaW1wb3J0IHsgQmFzZVN0YWNrIH0gZnJvbSAnLi4vbGliL2Jhc2Utc3RhY2snO1xyXG5pbXBvcnQgeyBFbnZTdGFnZVN0YWNrIH0gZnJvbSAnLi4vbGliL2Vudi1zdGFnZS1zdGFjayc7XHJcblxyXG5jb25zdCBhcHAgPSBuZXcgY2RrLkFwcCgpO1xyXG5jb25zdCBlbnYgPSBhcHAubm9kZS50cnlHZXRDb250ZXh0KCdlbnYnKTtcclxuXHJcbmlmICghZW52KSB0aHJvdyBuZXcgRXJyb3IoXCJDb250ZXh0IHZhcmlhYmxlICdlbnYnIGlzIHJlcXVpcmVkLiBVc2U6IGNkayBkZXBsb3kgLWMgZW52PWRldlwiKTtcclxuXHJcbmlmIChlbnYgPT09ICdiYXNlJykge1xyXG4gIG5ldyBCYXNlU3RhY2soYXBwLCAnQXBpR3dTaGFyZWRTdGFjaycpO1xyXG59IGVsc2Uge1xyXG4gIG5ldyBFbnZTdGFnZVN0YWNrKGFwcCwgYEVudlN0YWdlU3RhY2stJHtlbnZ9YCwge1xyXG4gIGVudjogeyBhY2NvdW50LCByZWdpb24gfSxcclxuICBzdGFnZTogZW52LFxyXG4gIGFwaTogc2hhcmVkQXBpLmFwaSwgLy8gdGhpcyBhc3N1bWVzIHNoYXJlZEFwaSBleHBvc2VzIHRoZSBBUEkgYXMgYC5hcGlgXHJcbiAgc3RhZ2VWYXJzOiB7XHJcbiAgICBwb2ludHNVcmw6ICdtb2NrLnNlcnZpY2UuaW50ZXJuYWwnLCAgICAgICAvLyByZXBsYWNlIHdpdGggYWN0dWFsIHBlci1lbnYgdmFsdWVzXHJcbiAgICBjb250ZW50ZnVsVXJsOiAnbW9jay5jb250ZW50LmludGVybmFsJyxcclxuICAgIHVzZXJzVXJsOiAnbW9jay51c2Vycy5pbnRlcm5hbCcsXHJcbiAgfSxcclxufSk7XHJcbn1cclxuKi9cclxuXHJcbi8qXHJcbmltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XHJcbmltcG9ydCB7IEJhc2VTdGFjayB9IGZyb20gJy4uL2xpYi9iYXNlLXN0YWNrJztcclxuaW1wb3J0IHsgRW52U3RhZ2VTdGFjayB9IGZyb20gJy4uL2xpYi9lbnYtc3RhZ2Utc3RhY2snO1xyXG5cclxuY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcclxuY29uc3QgZW52ID0gYXBwLm5vZGUudHJ5R2V0Q29udGV4dCgnZW52Jyk7XHJcblxyXG5pZiAoIWVudikgdGhyb3cgbmV3IEVycm9yKFwiQ29udGV4dCB2YXJpYWJsZSAnZW52JyBpcyByZXF1aXJlZC4gVXNlOiBjZGsgZGVwbG95IC1jIGVudj1kZXZcIik7XHJcblxyXG5pZiAoZW52ID09PSAnYmFzZScpIHtcclxuICBuZXcgQmFzZVN0YWNrKGFwcCwgJ0FwaUd3U2hhcmVkU3RhY2snKTtcclxufSBlbHNlIHtcclxuICBuZXcgRW52U3RhZ2VTdGFjayhhcHAsIGBBcGlHdy0ke2Vudn0tU3RhZ2VTdGFja2AsIHsgc3RhZ2VOYW1lOiBlbnYgfSk7XHJcbn1cclxuKi9cclxuIl19