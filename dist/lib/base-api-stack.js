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
exports.BaseApiStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class BaseApiStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const openApi = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'specs', 'dev.json'), 'utf8'));
        console.log(`openApi : ${openApi}`);
        const restApi = new aws_cdk_lib_1.aws_apigateway.CfnRestApi(this, 'BaseRestApi', {
            name: 'LoyaltyApiGateway-V2',
            description: 'Main API Gateway shared across stages',
            body: openApi,
            failOnWarnings: true,
            endpointConfiguration: {
                types: ['REGIONAL']
            }
        });
        console.log(`restApi : ${restApi}`);
        this.restApiId = restApi.ref;
        new aws_cdk_lib_1.CfnOutput(this, 'RestApiId', {
            value: this.restApiId,
            exportName: 'SharedApiGatewayId'
        });
    }
}
exports.BaseApiStack = BaseApiStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1hcGktc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvYmFzZS1hcGktc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBb0Y7QUFFcEYsdUNBQXlCO0FBQ3pCLDJDQUE2QjtBQUU3QixNQUFhLFlBQWEsU0FBUSxtQkFBSztJQUdyQyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQzFELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDckcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFFcEMsTUFBTSxPQUFPLEdBQUcsSUFBSSw0QkFBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFO1lBQ3hELElBQUksRUFBRSxzQkFBc0I7WUFDNUIsV0FBVyxFQUFFLHVDQUF1QztZQUNwRCxJQUFJLEVBQUUsT0FBTztZQUNiLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLHFCQUFxQixFQUFFO2dCQUNyQixLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUM7YUFDcEI7U0FDRixDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFFN0IsSUFBSSx1QkFBUyxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUU7WUFDL0IsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3JCLFVBQVUsRUFBRSxvQkFBb0I7U0FDakMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBMUJELG9DQTBCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YWNrLCBTdGFja1Byb3BzLCBhd3NfYXBpZ2F0ZXdheSBhcyBhcGlndywgQ2ZuT3V0cHV0IH0gZnJvbSAnYXdzLWNkay1saWInO1xyXG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcclxuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VBcGlTdGFjayBleHRlbmRzIFN0YWNrIHtcclxuICBwdWJsaWMgcmVhZG9ubHkgcmVzdEFwaUlkOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xyXG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XHJcblxyXG4gICAgY29uc3Qgb3BlbkFwaSA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihfX2Rpcm5hbWUsICcuLicsICdzcGVjcycsICdkZXYuanNvbicpLCAndXRmOCcpKTtcclxuICAgIGNvbnNvbGUubG9nKGBvcGVuQXBpIDogJHtvcGVuQXBpfWApO1xyXG4gICAgXHJcbiAgICBjb25zdCByZXN0QXBpID0gbmV3IGFwaWd3LkNmblJlc3RBcGkodGhpcywgJ0Jhc2VSZXN0QXBpJywge1xyXG4gICAgICBuYW1lOiAnTG95YWx0eUFwaUdhdGV3YXktVjInLFxyXG4gICAgICBkZXNjcmlwdGlvbjogJ01haW4gQVBJIEdhdGV3YXkgc2hhcmVkIGFjcm9zcyBzdGFnZXMnLFxyXG4gICAgICBib2R5OiBvcGVuQXBpLFxyXG4gICAgICBmYWlsT25XYXJuaW5nczogdHJ1ZSxcclxuICAgICAgZW5kcG9pbnRDb25maWd1cmF0aW9uOiB7XHJcbiAgICAgICAgdHlwZXM6IFsnUkVHSU9OQUwnXVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGNvbnNvbGUubG9nKGByZXN0QXBpIDogJHtyZXN0QXBpfWApO1xyXG4gICAgdGhpcy5yZXN0QXBpSWQgPSByZXN0QXBpLnJlZjtcclxuXHJcbiAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsICdSZXN0QXBpSWQnLCB7XHJcbiAgICAgIHZhbHVlOiB0aGlzLnJlc3RBcGlJZCxcclxuICAgICAgZXhwb3J0TmFtZTogJ1NoYXJlZEFwaUdhdGV3YXlJZCdcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=