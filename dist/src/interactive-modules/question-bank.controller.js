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
exports.QuestionBankController = void 0;
const common_1 = require("@nestjs/common");
const question_bank_service_1 = require("./question-bank.service");
const roles_decorator_1 = require("../user-managment/roles.decorator");
const roles_guard_1 = require("../user-managment/roles.guard");
const CreateQuestion_dto_1 = require("./dtos/CreateQuestion.dto");
let QuestionBankController = class QuestionBankController {
    constructor(questionBankService) {
        this.questionBankService = questionBankService;
    }
    async addQuestionBank(createQuestionBankDto) {
        return this.questionBankService.addQuestion(createQuestionBankDto);
    }
    async getQuestionBank(moduleId) {
        return this.questionBankService.getQuestionBankByModule(moduleId);
    }
    async editQuestion(moduleId, questionIndex, updatedQuestion) {
        if (!updatedQuestion) {
            throw new common_1.NotFoundException('No question data provided for update');
        }
        return this.questionBankService.editQuestion(moduleId, questionIndex, updatedQuestion);
    }
    async deleteQuestion(moduleId, questionIndex) {
        return this.questionBankService.deleteQuestion(moduleId, questionIndex);
    }
    async addQuestionsToBank(moduleId, questions) {
        if (!questions || questions.length === 0) {
            throw new common_1.BadRequestException('No questions provided to add.');
        }
        return this.questionBankService.addQuestionsToBank(moduleId, questions);
    }
};
exports.QuestionBankController = QuestionBankController;
__decorate([
    (0, common_1.Post)('add'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('instructor'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateQuestion_dto_1.CreateQuestionDto]),
    __metadata("design:returntype", Promise)
], QuestionBankController.prototype, "addQuestionBank", null);
__decorate([
    (0, common_1.Get)(':moduleId'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('instructor', 'student'),
    __param(0, (0, common_1.Param)('moduleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionBankController.prototype, "getQuestionBank", null);
__decorate([
    (0, common_1.Patch)(':moduleId/edit-question/:questionIndex'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('instructor'),
    __param(0, (0, common_1.Param)('moduleId')),
    __param(1, (0, common_1.Param)('questionIndex')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], QuestionBankController.prototype, "editQuestion", null);
__decorate([
    (0, common_1.Delete)(':moduleId/delete-question/:questionIndex'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('instructor'),
    __param(0, (0, common_1.Param)('moduleId')),
    __param(1, (0, common_1.Param)('questionIndex')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], QuestionBankController.prototype, "deleteQuestion", null);
__decorate([
    (0, common_1.Patch)(':moduleId/add-questions'),
    (0, roles_decorator_1.Roles)('instructor'),
    __param(0, (0, common_1.Param)('moduleId')),
    __param(1, (0, common_1.Body)('questions')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], QuestionBankController.prototype, "addQuestionsToBank", null);
exports.QuestionBankController = QuestionBankController = __decorate([
    (0, common_1.Controller)('question-bank'),
    __metadata("design:paramtypes", [question_bank_service_1.QuestionBankService])
], QuestionBankController);
//# sourceMappingURL=question-bank.controller.js.map