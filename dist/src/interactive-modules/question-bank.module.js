"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionBankModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const question_bank_controller_1 = require("./question-bank.controller");
const question_bank_service_1 = require("./question-bank.service");
const questionsbank_schema_1 = require("./questionsbank.schema");
const jwt_1 = require("@nestjs/jwt");
const roles_guard_1 = require("../user-managment/roles.guard");
const core_1 = require("@nestjs/core");
const users_module_1 = require("../user-managment/users.module");
let QuestionBankModule = class QuestionBankModule {
};
exports.QuestionBankModule = QuestionBankModule;
exports.QuestionBankModule = QuestionBankModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'QuestionBank', schema: questionsbank_schema_1.QuestionBankSchema }]),
            jwt_1.JwtModule.register({
                secret: 'ahmed',
                signOptions: { expiresIn: '1h' },
            }),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
        ],
        controllers: [question_bank_controller_1.QuestionBankController],
        providers: [
            question_bank_service_1.QuestionBankService,
            roles_guard_1.RolesGuard,
            core_1.Reflector,
        ],
        exports: [
            question_bank_service_1.QuestionBankService,
            mongoose_1.MongooseModule,
        ],
    })
], QuestionBankModule);
//# sourceMappingURL=question-bank.module.js.map