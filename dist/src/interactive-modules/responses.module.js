"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const responses_service_1 = require("./responses.service");
const responses_controller_1 = require("./responses.controller");
const responses_schema_1 = require("./responses.schema");
const quizzes_schema_1 = require("../interactive-modules/quizzes.schema");
const roles_guard_1 = require("../user-managment/roles.guard");
const core_1 = require("@nestjs/core");
let ResponsesModule = class ResponsesModule {
};
exports.ResponsesModule = ResponsesModule;
exports.ResponsesModule = ResponsesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Response', schema: responses_schema_1.ResponseSchema },
                { name: 'Quiz', schema: quizzes_schema_1.QuizSchema },
            ]),
            jwt_1.JwtModule.register({
                secret: 'ahmed',
                signOptions: { expiresIn: '1h' },
            }),
        ],
        controllers: [responses_controller_1.ResponsesController],
        providers: [responses_service_1.ResponsesService, roles_guard_1.RolesGuard, core_1.Reflector],
        exports: [responses_service_1.ResponsesService, mongoose_1.MongooseModule],
    })
], ResponsesModule);
//# sourceMappingURL=responses.module.js.map