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
exports.ModuleService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ModuleService = class ModuleService {
    constructor(moduleModel, courseModel, instructorModel) {
        this.moduleModel = moduleModel;
        this.courseModel = courseModel;
        this.instructorModel = instructorModel;
    }
    async validateInstructorForCourse(userId, courseId) {
        const instructor = await this.instructorModel.findOne({ userId }).exec();
        if (!instructor) {
            throw new common_1.UnauthorizedException('Instructor not found');
        }
        const course = await this.courseModel.findOne({ courseId }).exec();
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        if (course.createdBy !== instructor.name) {
            throw new common_1.UnauthorizedException('You are not authorized to create modules for this course');
        }
    }
    async createModule(userId, moduleDto) {
        await this.validateInstructorForCourse(userId, moduleDto.courseId);
        const instructor = await this.instructorModel.findOne({ userId }).exec();
        if (!instructor) {
            throw new common_1.NotFoundException(`Instructor with ID '${userId}' not found`);
        }
        const existingModule = await this.moduleModel
            .findOne({
            moduleId: moduleDto.moduleId,
            courseId: moduleDto.courseId,
        })
            .exec();
        if (existingModule) {
            throw new common_1.ConflictException(`A module with ID '${moduleDto.moduleId}' already exists for course '${moduleDto.courseId}'.`);
        }
        const newModule = new this.moduleModel({
            ...moduleDto,
            createdBy: instructor.name,
        });
        return await newModule.save();
    }
    async getModulesByCourse(courseId) {
        return this.moduleModel.find({ courseId }).exec();
    }
    async updateModule(userId, moduleId, updateData) {
        const module = await this.moduleModel.findOne({ moduleId }).exec();
        if (!module) {
            throw new common_1.NotFoundException(`Module with ID '${moduleId}' not found`);
        }
        const course = await this.courseModel.findOne({ courseId: module.courseId }).exec();
        if (!course || course.createdBy !== userId) {
            throw new common_1.UnauthorizedException('You are not authorized to update this module');
        }
        Object.assign(module, updateData);
        if (typeof updateData.isOutdated !== 'undefined') {
            module.isOutdated = updateData.isOutdated;
        }
        return await module.save();
    }
    async getModulesOrderedByDate(order) {
        return this.moduleModel.find().sort({ createdAt: order === 'asc' ? 1 : -1 }).exec();
    }
    async getModulesForStudents(courseId) {
        return this.moduleModel.find({ courseId, isOutdated: { $ne: true } }).exec();
    }
};
exports.ModuleService = ModuleService;
exports.ModuleService = ModuleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Module')),
    __param(1, (0, mongoose_1.InjectModel)('Course')),
    __param(2, (0, mongoose_1.InjectModel)('Instructor')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ModuleService);
//# sourceMappingURL=module.service.js.map