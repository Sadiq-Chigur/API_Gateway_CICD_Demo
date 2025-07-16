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
exports.DevStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class DevStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        console.log(`stageName : ${props.stageName}`);
        const { restApiId, stageName } = props;
        const specPath = path.join(__dirname, '..', 'specs', `${stageName}.json`);
        const openApi = JSON.parse(fs.readFileSync(specPath, 'utf8'));
        console.log(`specPath : ${specPath}`);
        const deployment = new aws_cdk_lib_1.aws_apigateway.CfnDeployment(this, `Deployment-${stageName}`, {
            restApiId: restApiId,
            description: `${stageName} deployment`
        });
        new aws_cdk_lib_1.aws_apigateway.CfnStage(this, `Stage-${stageName}`, {
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
exports.DevStack = DevStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2LXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2Rldi1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUF5RTtBQUV6RSx1Q0FBeUI7QUFDekIsMkNBQTZCO0FBTzdCLE1BQWEsUUFBUyxTQUFRLG1CQUFLO0lBQ2pDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBb0I7UUFDNUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFnQixLQUFLLENBQUMsU0FBVSxFQUFFLENBQUMsQ0FBQztRQUVoRCxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxHQUFHLEtBQUssQ0FBQztRQUV2QyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEdBQUcsU0FBUyxPQUFPLENBQUMsQ0FBQztRQUMxRSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFFOUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFFdEMsTUFBTSxVQUFVLEdBQUcsSUFBSSw0QkFBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsY0FBYyxTQUFTLEVBQUUsRUFBRTtZQUMxRSxTQUFTLEVBQUUsU0FBUztZQUNwQixXQUFXLEVBQUUsR0FBRyxTQUFTLGFBQWE7U0FDdkMsQ0FBQyxDQUFDO1FBRUgsSUFBSSw0QkFBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsU0FBUyxTQUFTLEVBQUUsRUFBRTtZQUM3QyxTQUFTLEVBQUUsU0FBUztZQUNwQixZQUFZLEVBQUUsVUFBVSxDQUFDLEdBQUc7WUFDNUIsU0FBUyxFQUFFLFNBQVM7WUFDcEIsU0FBUyxFQUFFO2dCQUNULFNBQVMsRUFBRSxHQUFHLFNBQVMsbUJBQW1CO2dCQUMxQyxhQUFhLEVBQUUsR0FBRyxTQUFTLG1CQUFtQjtnQkFDOUMsUUFBUSxFQUFFLEdBQUcsU0FBUyxtQkFBbUI7YUFDMUM7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUE3QkQsNEJBNkJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RhY2ssIFN0YWNrUHJvcHMsIGF3c19hcGlnYXRld2F5IGFzIGFwaWd3IH0gZnJvbSAnYXdzLWNkay1saWInO1xyXG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcclxuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuaW50ZXJmYWNlIERldlN0YWNrUHJvcHMgZXh0ZW5kcyBTdGFja1Byb3BzIHtcclxuICByZXN0QXBpSWQ6IHN0cmluZztcclxuICBzdGFnZU5hbWU6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERldlN0YWNrIGV4dGVuZHMgU3RhY2sge1xyXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBEZXZTdGFja1Byb3BzKSB7XHJcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhgc3RhZ2VOYW1lIDogJHsgcHJvcHMuc3RhZ2VOYW1lIH1gKTtcclxuXHJcbiAgICBjb25zdCB7IHJlc3RBcGlJZCwgc3RhZ2VOYW1lIH0gPSBwcm9wcztcclxuXHJcbiAgICBjb25zdCBzcGVjUGF0aCA9IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLicsICdzcGVjcycsIGAke3N0YWdlTmFtZX0uanNvbmApO1xyXG4gICAgY29uc3Qgb3BlbkFwaSA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHNwZWNQYXRoLCAndXRmOCcpKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhgc3BlY1BhdGggOiAke3NwZWNQYXRofWApO1xyXG5cclxuICAgIGNvbnN0IGRlcGxveW1lbnQgPSBuZXcgYXBpZ3cuQ2ZuRGVwbG95bWVudCh0aGlzLCBgRGVwbG95bWVudC0ke3N0YWdlTmFtZX1gLCB7XHJcbiAgICAgIHJlc3RBcGlJZDogcmVzdEFwaUlkLFxyXG4gICAgICBkZXNjcmlwdGlvbjogYCR7c3RhZ2VOYW1lfSBkZXBsb3ltZW50YFxyXG4gICAgfSk7XHJcblxyXG4gICAgbmV3IGFwaWd3LkNmblN0YWdlKHRoaXMsIGBTdGFnZS0ke3N0YWdlTmFtZX1gLCB7XHJcbiAgICAgIHJlc3RBcGlJZDogcmVzdEFwaUlkLFxyXG4gICAgICBkZXBsb3ltZW50SWQ6IGRlcGxveW1lbnQucmVmLFxyXG4gICAgICBzdGFnZU5hbWU6IHN0YWdlTmFtZSxcclxuICAgICAgdmFyaWFibGVzOiB7XHJcbiAgICAgICAgcG9pbnRzVXJsOiBgJHtzdGFnZU5hbWV9LmFwaS5za2VjaGVycy5jb21gLFxyXG4gICAgICAgIGNvbnRlbnRmdWxVcmw6IGAke3N0YWdlTmFtZX0uYXBpLnNrZWNoZXJzLmNvbWAsXHJcbiAgICAgICAgdXNlcnNVcmw6IGAke3N0YWdlTmFtZX0uYXBpLnNrZWNoZXJzLmNvbWBcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==