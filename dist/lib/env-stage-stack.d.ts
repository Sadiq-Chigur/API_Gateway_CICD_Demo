import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
interface EnvStageStackProps extends cdk.StackProps {
    stageName: string;
}
export declare class EnvStageStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: EnvStageStackProps);
}
export {};
