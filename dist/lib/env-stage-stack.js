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
exports.EnvStageStack = void 0;
const cdk = __importStar(require("aws-cdk-lib"));
const apigateway = __importStar(require("aws-cdk-lib/aws-apigateway"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class EnvStageStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const stage = props.stageName;
        const filePath = path.join(__dirname, `../specs/${stage}.json`);
        const apiSpec = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const sharedApi = apigateway.RestApi.fromRestApiAttributes(this, `ImportedAPI-${stage}`, {
            restApiId: cdk.Fn.importValue('SharedApiGatewayRestApiId'),
            rootResourceId: cdk.Fn.importValue('SharedApiGatewayRootResourceId'),
        });
        new apigateway.Deployment(this, `Deployment-${stage}`, {
            api: sharedApi,
            description: `Deployment for ${stage} stage`,
        }).addStage(stage, { stageName: stage });
    }
}
exports.EnvStageStack = EnvStageStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52LXN0YWdlLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2Vudi1zdGFnZS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFtQztBQUVuQyx1RUFBeUQ7QUFDekQsdUNBQXlCO0FBQ3pCLDJDQUE2QjtBQU03QixNQUFhLGFBQWMsU0FBUSxHQUFHLENBQUMsS0FBSztJQUMxQyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXlCO1FBQ2pFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDOUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsWUFBWSxLQUFLLE9BQU8sQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUU5RCxNQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLElBQUksRUFBRSxlQUFlLEtBQUssRUFBRSxFQUFFO1lBQ3ZGLFNBQVMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQywyQkFBMkIsQ0FBQztZQUMxRCxjQUFjLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsZ0NBQWdDLENBQUM7U0FDckUsQ0FBQyxDQUFDO1FBRUgsSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxjQUFjLEtBQUssRUFBRSxFQUFFO1lBQ3JELEdBQUcsRUFBRSxTQUFTO1lBQ2QsV0FBVyxFQUFFLGtCQUFrQixLQUFLLFFBQVE7U0FDN0MsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUMzQyxDQUFDO0NBQ0Y7QUFsQkQsc0NBa0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0ICogYXMgYXBpZ2F0ZXdheSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtYXBpZ2F0ZXdheSc7XG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuXG5pbnRlcmZhY2UgRW52U3RhZ2VTdGFja1Byb3BzIGV4dGVuZHMgY2RrLlN0YWNrUHJvcHMge1xuICBzdGFnZU5hbWU6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEVudlN0YWdlU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogRW52U3RhZ2VTdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICBjb25zdCBzdGFnZSA9IHByb3BzLnN0YWdlTmFtZTtcbiAgICBjb25zdCBmaWxlUGF0aCA9IHBhdGguam9pbihfX2Rpcm5hbWUsIGAuLi9zcGVjcy8ke3N0YWdlfS5qc29uYCk7XG4gICAgY29uc3QgYXBpU3BlYyA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKGZpbGVQYXRoLCAndXRmOCcpKTtcblxuICAgIGNvbnN0IHNoYXJlZEFwaSA9IGFwaWdhdGV3YXkuUmVzdEFwaS5mcm9tUmVzdEFwaUF0dHJpYnV0ZXModGhpcywgYEltcG9ydGVkQVBJLSR7c3RhZ2V9YCwge1xuICAgICAgcmVzdEFwaUlkOiBjZGsuRm4uaW1wb3J0VmFsdWUoJ1NoYXJlZEFwaUdhdGV3YXlSZXN0QXBpSWQnKSxcbiAgICAgIHJvb3RSZXNvdXJjZUlkOiBjZGsuRm4uaW1wb3J0VmFsdWUoJ1NoYXJlZEFwaUdhdGV3YXlSb290UmVzb3VyY2VJZCcpLFxuICAgIH0pO1xuXG4gICAgbmV3IGFwaWdhdGV3YXkuRGVwbG95bWVudCh0aGlzLCBgRGVwbG95bWVudC0ke3N0YWdlfWAsIHtcbiAgICAgIGFwaTogc2hhcmVkQXBpLFxuICAgICAgZGVzY3JpcHRpb246IGBEZXBsb3ltZW50IGZvciAke3N0YWdlfSBzdGFnZWAsXG4gICAgfSkuYWRkU3RhZ2Uoc3RhZ2UsIHsgc3RhZ2VOYW1lOiBzdGFnZSB9KTtcbiAgfVxufVxuIl19