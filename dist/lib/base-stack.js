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
exports.BaseStack = void 0;
const cdk = __importStar(require("aws-cdk-lib"));
const apigateway = __importStar(require("aws-cdk-lib/aws-apigateway"));
class BaseStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        new apigateway.SpecRestApi(this, 'SharedApiGateway', {
            apiDefinition: apigateway.ApiDefinition.fromInline({
                openapi: '3.0.1',
                info: { title: 'Shared API', version: 'v1' },
                paths: {},
            }),
            deploy: false,
            restApiName: 'Shared-API-Gateway',
        });
    }
}
exports.BaseStack = BaseStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9iYXNlLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQW1DO0FBRW5DLHVFQUF5RDtBQUV6RCxNQUFhLFNBQVUsU0FBUSxHQUFHLENBQUMsS0FBSztJQUN0QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQzlELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLElBQUksVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUU7WUFDbkQsYUFBYSxFQUFFLFVBQVUsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO2dCQUNqRCxPQUFPLEVBQUUsT0FBTztnQkFDaEIsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO2dCQUM1QyxLQUFLLEVBQUUsRUFBRTthQUNWLENBQUM7WUFDRixNQUFNLEVBQUUsS0FBSztZQUNiLFdBQVcsRUFBRSxvQkFBb0I7U0FDbEMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBZEQsOEJBY0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgKiBhcyBhcGlnYXRld2F5IGZyb20gJ2F3cy1jZGstbGliL2F3cy1hcGlnYXRld2F5JztcblxuZXhwb3J0IGNsYXNzIEJhc2VTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIG5ldyBhcGlnYXRld2F5LlNwZWNSZXN0QXBpKHRoaXMsICdTaGFyZWRBcGlHYXRld2F5Jywge1xuICAgICAgYXBpRGVmaW5pdGlvbjogYXBpZ2F0ZXdheS5BcGlEZWZpbml0aW9uLmZyb21JbmxpbmUoe1xuICAgICAgICBvcGVuYXBpOiAnMy4wLjEnLFxuICAgICAgICBpbmZvOiB7IHRpdGxlOiAnU2hhcmVkIEFQSScsIHZlcnNpb246ICd2MScgfSxcbiAgICAgICAgcGF0aHM6IHt9LFxuICAgICAgfSksXG4gICAgICBkZXBsb3k6IGZhbHNlLFxuICAgICAgcmVzdEFwaU5hbWU6ICdTaGFyZWQtQVBJLUdhdGV3YXknLFxuICAgIH0pO1xuICB9XG59XG4iXX0=