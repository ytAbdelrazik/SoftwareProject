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
exports.PerformanceTrackingController = void 0;
const common_1 = require("@nestjs/common");
const performance_tracking_service_1 = require("./performance-tracking.service");
const update_progress_dto_1 = require("./dtos/update-progress.dto");
const roles_guard_1 = require("../user-managment/roles.guard");
let PerformanceTrackingController = class PerformanceTrackingController {
    constructor(service) {
        this.service = service;
    }
    async createProgress(body) {
        return this.service.createProgress(body);
    }
    async getModuleRatings(courseId) {
        return this.service.getModuleRatings(courseId);
    }
    async getAllProgress() {
        return this.service.getAllProgress();
    }
    async getQuizPerformanceByQuizId(quizId) {
        return this.service.getQuizPerformanceByQuizId(quizId);
    }
    async getStudentQuizPerformance(quizId, userId) {
        return this.service.getStudentQuizPerformance(quizId, userId);
    }
    async addRating({ userId, courseId, moduleId, rating, }) {
        return this.service.addRating(userId, courseId, moduleId || null, rating);
    }
    async addInstructorRating(userId, instructorId, courseId, rating) {
        if (rating < 1 || rating > 5) {
            throw new common_1.BadRequestException('Rating must be between 1 and 5.');
        }
        return this.service.addInstructorRating(userId, instructorId, courseId, rating);
    }
    async getAverageRatingForCourse(courseId) {
        return this.service.getAverageRatingForCourse(courseId);
    }
    async getAverageRatingForInstructor(instructorId) {
        return this.service.getAverageRatingForInstructor(instructorId);
    }
    async getProgressByUser(userId) {
        return this.service.getProgressByUser(userId);
    }
    async updateProgress(progressId, updateProgressDto) {
        return this.service.updateProgress(progressId, updateProgressDto);
    }
    async deleteProgress(progressId) {
        return this.service.deleteProgress(progressId);
    }
    async getStudentDashboard(studentId) {
        return this.service.getStudentDashboard(studentId);
    }
    async getCourseAnalytics(courseId) {
        return this.service.getCourseAnalytics(courseId);
    }
    async exportData(courseId, userId, format = 'csv', res) {
        console.log(`Export request received for courseId: ${courseId}, userId: ${userId} with format: ${format}`);
        try {
            const analyticsData = await this.service.exportAnalytics(courseId, userId, format, res);
            res.status(common_1.HttpStatus.OK).json(analyticsData);
        }
        catch (error) {
            console.error('Error exporting analytics:', error.message);
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while exporting data.' });
        }
    }
};
exports.PerformanceTrackingController = PerformanceTrackingController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_progress_dto_1.UpdateProgressDto]),
    __metadata("design:returntype", Promise)
], PerformanceTrackingController.prototype, "createProgress", null);
__decorate([
    (0, common_1.Get)('module-ratings/:courseId'),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PerformanceTrackingController.prototype, "getModuleRatings", null);
__decorate([
    (0, common_1.Get)('/allprog'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PerformanceTrackingController.prototype, "getAllProgress", null);
__decorate([
    (0, common_1.Get)('quiz-performance/:quizId'),
    __param(0, (0, common_1.Param)('quizId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PerformanceTrackingController.prototype, "getQuizPerformanceByQuizId", null);
__decorate([
    (0, common_1.Get)('quiz-performance/student/:quizId/:userId'),
    __param(0, (0, common_1.Param)('quizId')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PerformanceTrackingController.prototype, "getStudentQuizPerformance", null);
__decorate([
    (0, common_1.Post)('rating'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PerformanceTrackingController.prototype, "addRating", null);
__decorate([
    (0, common_1.Post)('instructor'),
    __param(0, (0, common_1.Body)('userId')),
    __param(1, (0, common_1.Body)('instructorId')),
    __param(2, (0, common_1.Body)('courseId')),
    __param(3, (0, common_1.Body)('rating')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number]),
    __metadata("design:returntype", Promise)
], PerformanceTrackingController.prototype, "addInstructorRating", null);
__decorate([
    (0, common_1.Get)('courserating/:courseId'),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PerformanceTrackingController.prototype, "getAverageRatingForCourse", null);
__decorate([
    (0, common_1.Get)('instructor/:instructorId'),
    __param(0, (0, common_1.Param)('instructorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PerformanceTrackingController.prototype, "getAverageRatingForInstructor", null);
__decorate([
    (0, common_1.Get)('/user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PerformanceTrackingController.prototype, "getProgressByUser", null);
__decorate([
    (0, common_1.Put)('/:progressId'),
    __param(0, (0, common_1.Param)('progressId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_progress_dto_1.UpdateProgressDto]),
    __metadata("design:returntype", Promise)
], PerformanceTrackingController.prototype, "updateProgress", null);
__decorate([
    (0, common_1.Delete)('/:progressId'),
    __param(0, (0, common_1.Param)('progressId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PerformanceTrackingController.prototype, "deleteProgress", null);
__decorate([
    (0, common_1.Get)('/dashboard/:studentId'),
    __param(0, (0, common_1.Param)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PerformanceTrackingController.prototype, "getStudentDashboard", null);
__decorate([
    (0, common_1.Get)('/analytics/course/:courseId'),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PerformanceTrackingController.prototype, "getCourseAnalytics", null);
__decorate([
    (0, common_1.Get)(':userId/:courseId/export'),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Query)('format')),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], PerformanceTrackingController.prototype, "exportData", null);
exports.PerformanceTrackingController = PerformanceTrackingController = __decorate([
    (0, common_1.Controller)('performance-tracking'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [performance_tracking_service_1.PerformanceTrackingService])
], PerformanceTrackingController);
//# sourceMappingURL=performance-tracking.controller.js.map