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
exports.QuizzesController = void 0;
const common_1 = require("@nestjs/common");
const quizzes_service_1 = require("./quizzes.service");
const roles_guard_1 = require("../user-managment/roles.guard");
const roles_decorator_1 = require("../user-managment/roles.decorator");
let QuizzesController = class QuizzesController {
    constructor(quizzesService) {
        this.quizzesService = quizzesService;
    }
    async createQuiz(moduleId, numberOfQuestions, questionType, difficulty) {
        return this.quizzesService.createQuiz(moduleId, numberOfQuestions, questionType, difficulty);
    }
    async startQuiz(quizId, req) {
        const studentId = req.user.userId;
        return this.quizzesService.generateQuizForStudent(quizId, studentId);
    }
    async getQuizByModule(moduleId) {
        return this.quizzesService.getQuizByModule(moduleId);
    }
    async updateQuiz(quizId, updatedData) {
        return this.quizzesService.updateQuiz(quizId, updatedData);
    }
    async deleteQuiz(quizId) {
        return this.quizzesService.deleteQuiz(quizId);
    }
};
exports.QuizzesController = QuizzesController;
__decorate([
    (0, common_1.Post)('create/:moduleId'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('instructor'),
    __param(0, (0, common_1.Param)('moduleId')),
    __param(1, (0, common_1.Body)('numberOfQuestions')),
    __param(2, (0, common_1.Body)('questionType')),
    __param(3, (0, common_1.Body)('difficulty')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String, String]),
    __metadata("design:returntype", Promise)
], QuizzesController.prototype, "createQuiz", null);
__decorate([
    (0, common_1.Post)(':quizId/start'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('student'),
    __param(0, (0, common_1.Param)('quizId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QuizzesController.prototype, "startQuiz", null);
__decorate([
    (0, common_1.Get)(':moduleId'),
    (0, roles_decorator_1.Roles)('student'),
    __param(0, (0, common_1.Param)('moduleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuizzesController.prototype, "getQuizByModule", null);
__decorate([
    (0, common_1.Patch)(':quizId'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('instructor'),
    __param(0, (0, common_1.Param)('quizId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QuizzesController.prototype, "updateQuiz", null);
__decorate([
    (0, common_1.Delete)(':quizId'),
    (0, roles_decorator_1.Roles)('instructor'),
    __param(0, (0, common_1.Param)('quizId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuizzesController.prototype, "deleteQuiz", null);
exports.QuizzesController = QuizzesController = __decorate([
    (0, common_1.Controller)('quizzes'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [quizzes_service_1.QuizzesService])
], QuizzesController);
//# sourceMappingURL=quizzes.controller.js.map