import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
interface StageStackProps extends StackProps {
    restApiId: string;
    stageName: string;
}
export declare class StageStack extends Stack {
    constructor(scope: Construct, id: string, props: StageStackProps);
}
export {};
