"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractiveModulesController = void 0;
const common_1 = require("@nestjs/common");
const quizzes_service_1 = require("./quizzes.service");
const quizzes_schema_1 = require("./quizzes.schema");
const responses_schema_1 = require("./responses.schema");
let InteractiveModulesController = class InteractiveModulesController {
    constructor(interactiveModulesService) {
        this.interactiveModulesService = interactiveModulesService;
    }
    async createQuiz(quiz) {
        return this.interactiveModulesService.createQuiz(quiz);
    }
    async getQuizzes() {
        return this.interactiveModulesService.getQuizzes();
    }
    async submitResponse(response) {
        return this.interactiveModulesService.submitResponse(response);
    }
    async getResponses(quizId) {
        return this.interactiveModulesService.getResponses(quizId);
    }
};
exports.InteractiveModulesController = InteractiveModulesController;
__decorate([
    (0, common_1.Post)('quizzes'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [quizzes_schema_1.Quiz]),
    __metadata("design:returntype", Promise)
], InteractiveModulesController.prototype, "createQuiz", null);
__decorate([
    (0, common_1.Get)('quizzes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InteractiveModulesController.prototype, "getQuizzes", null);
__decorate([
    (0, common_1.Post)('responses'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [responses_schema_1.Response]),
    __metadata("design:returntype", Promise)
], InteractiveModulesController.prototype, "submitResponse", null);
__decorate([
    (0, common_1.Get)('responses/:quizId'),
    __param(0, (0, common_1.Param)('quizId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InteractiveModulesController.prototype, "getResponses", null);
exports.InteractiveModulesController = InteractiveModulesController = __decorate([
    (0, common_1.Controller)('interactive-modules'),
    __metadata("design:paramtypes", [quizzes_service_1.InteractiveModulesService])
], InteractiveModulesController);
//# sourceMappingURL=quizzes.controller.js.map