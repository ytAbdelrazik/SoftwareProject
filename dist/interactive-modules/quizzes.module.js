"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractiveModulesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const quizzes_schema_1 = require("./quizzes.schema");
const responses_schema_1 = require("./responses.schema");
const quizzes_service_1 = require("./quizzes.service");
const quizzes_controller_1 = require("./quizzes.controller");
let InteractiveModulesModule = class InteractiveModulesModule {
};
exports.InteractiveModulesModule = InteractiveModulesModule;
exports.InteractiveModulesModule = InteractiveModulesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: quizzes_schema_1.Quiz.name, schema: quizzes_schema_1.QuizSchema },
                { name: responses_schema_1.Response.name, schema: responses_schema_1.ResponseSchema },
            ]),
        ],
        controllers: [quizzes_controller_1.InteractiveModulesController],
        providers: [quizzes_service_1.InteractiveModulesService],
        exports: [mongoose_1.MongooseModule],
    })
], InteractiveModulesModule);
//# sourceMappingURL=quizzes.module.js.map