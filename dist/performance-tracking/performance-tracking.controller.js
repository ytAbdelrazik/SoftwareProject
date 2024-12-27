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
let PerformanceTrackingController = class PerformanceTrackingController {
    constructor(service) {
        this.service = service;
    }
    async createProgress(body) {
        return this.service.createProgress(body);
    }
    async getAllProgress() {
        return this.service.getAllProgress();
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
};
exports.PerformanceTrackingController = PerformanceTrackingController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PerformanceTrackingController.prototype, "createProgress", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PerformanceTrackingController.prototype, "getAllProgress", null);
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
exports.PerformanceTrackingController = PerformanceTrackingController = __decorate([
    (0, common_1.Controller)('performance-tracking'),
    __metadata("design:paramtypes", [performance_tracking_service_1.PerformanceTrackingService])
], PerformanceTrackingController);
//# sourceMappingURL=performance-tracking.controller.js.map