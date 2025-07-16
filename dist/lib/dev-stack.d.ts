import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
interface DevStackProps extends StackProps {
    restApiId: string;
    stageName: string;
}
export declare class DevStack extends Stack {
    constructor(scope: Construct, id: string, props: DevStackProps);
}
export {};
