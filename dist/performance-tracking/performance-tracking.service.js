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
exports.PerformanceTrackingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const progress_schema_1 = require("./progress.schema");
let PerformanceTrackingService = class PerformanceTrackingService {
    constructor(progressModel) {
        this.progressModel = progressModel;
    }
    async createProgress(data) {
        const progress = new this.progressModel(data);
        return progress.save();
    }
    async getAllProgress() {
        return this.progressModel.find().exec();
    }
    async getProgressByUser(userId) {
        const progress = await this.progressModel.find({ userId }).exec();
        if (!progress.length) {
            throw new common_1.NotFoundException('No progress found for this user.');
        }
        return progress;
    }
    async updateProgress(progressId, updateProgressDto) {
        const updated = await this.progressModel
            .findOneAndUpdate({ progressId }, updateProgressDto, { new: true })
            .exec();
        if (!updated) {
            throw new common_1.NotFoundException('Progress not found.');
        }
        return updated;
    }
    async deleteProgress(progressId) {
        const result = await this.progressModel
            .findOneAndDelete({ progressId })
            .exec();
        if (!result) {
            throw new common_1.NotFoundException('Progress not found.');
        }
    }
};
exports.PerformanceTrackingService = PerformanceTrackingService;
exports.PerformanceTrackingService = PerformanceTrackingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(progress_schema_1.Progress.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PerformanceTrackingService);
//# sourceMappingURL=performance-tracking.service.js.map