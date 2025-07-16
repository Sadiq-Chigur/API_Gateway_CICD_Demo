#!/usr/bin/env node

import * as cdk from 'aws-cdk-lib';
import { BaseApiStack } from '../lib/base-api-stack';
import { StageStack } from '../lib/staging-stack';
import { DevStack } from '../lib/dev-stack';

const app = new cdk.App();
const envName = app.node.tryGetContext('env'); // pass with -c env=dev

console.log(`Environment: ${envName}`);

if (!envName) throw new Error('Must pass -c env=dev|staging|prod');

if (envName === 'base') {
  console.log(`Environmentin if part of base : ${envName}`);
  new BaseApiStack(app, 'ApiGatewayBaseStack', {
    env: { region: 'us-east-1' }
  });
} else if (['dev', 'staging', 'prod'].includes(envName)) {
  console.log(`Environment in else part : ${envName}`);
  new StageStack(app, `ApiGatewayStage-${envName}`, {
    env: { region: 'us-east-1' },
    restApiId: cdk.Fn.importValue('SharedApiGatewayId'),
    stageName: envName
  });
} else {
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
