import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
export declare class BaseApiStack extends Stack {
    readonly restApiId: string;
    constructor(scope: Construct, id: string, props?: StackProps);
}
