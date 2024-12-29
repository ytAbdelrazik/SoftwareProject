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
exports.ResponsesController = void 0;
const common_1 = require("@nestjs/common");
const responses_service_1 = require("./responses.service");
const roles_guard_1 = require("../user-managment/roles.guard");
const roles_decorator_1 = require("../user-managment/roles.decorator");
let ResponsesController = class ResponsesController {
    constructor(responsesService) {
        this.responsesService = responsesService;
    }
    async submitAnswers(quizId, answers, req) {
        const studentId = req.user.userId;
        return this.responsesService.submitResponse(studentId, quizId, answers);
    }
    async getFeedback(req, quizId) {
        const studentId = req.user.userId;
        return this.responsesService.getFeedback(studentId, quizId);
    }
};
exports.ResponsesController = ResponsesController;
__decorate([
    (0, common_1.Post)(':quizId/submit'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('student'),
    __param(0, (0, common_1.Param)('quizId')),
    __param(1, (0, common_1.Body)('answers')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array, Object]),
    __metadata("design:returntype", Promise)
], ResponsesController.prototype, "submitAnswers", null);
__decorate([
    (0, common_1.Get)('feedback/:quizId'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('student'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('quizId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ResponsesController.prototype, "getFeedback", null);
exports.ResponsesController = ResponsesController = __decorate([
    (0, common_1.Controller)('responses'),
    __metadata("design:paramtypes", [responses_service_1.ResponsesService])
], ResponsesController);
//# sourceMappingURL=responses.controller.js.map