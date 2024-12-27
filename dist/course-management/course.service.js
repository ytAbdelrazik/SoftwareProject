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
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const course_schema_1 = require("./course.schema");
let CourseService = class CourseService {
    constructor(courseModel, studentModel, instructorModel) {
        this.courseModel = courseModel;
        this.studentModel = studentModel;
        this.instructorModel = instructorModel;
    }
    async createCourse(createCourseDto) {
        const newCourse = await this.courseModel.create(createCourseDto);
        return newCourse;
    }
    async getAllCourses() {
        return this.courseModel.find().exec();
    }
    async updateCourse(courseId, updateCourseDto) {
        const course = await this.courseModel.findOne({ courseId });
        if (!course) {
            throw new common_1.NotFoundException(`Course with ID ${courseId} not found.`);
        }
        const newVersion = {
            version: `v${course.versions.length + 1}`,
            content: { ...course.toObject() },
            updatedAt: new Date(),
        };
        course.versions.push(newVersion);
        Object.assign(course, updateCourseDto);
        return course.save();
    }
    async revertToVersion(courseId, version) {
        try {
            const course = await this.courseModel.findOne({ courseId });
            if (!course) {
                throw new common_1.NotFoundException(`Course with ID ${courseId} not found.`);
            }
            const versionData = course.versions.find((v) => v.version === version);
            if (!versionData) {
                throw new common_1.NotFoundException(`Version ${version} not found for course ${courseId}.`);
            }
            console.log('Reverting to version data:', versionData);
            const restoredContent = { ...versionData.content };
            delete restoredContent.versions;
            Object.assign(course, restoredContent);
            return course.save();
        }
        catch (error) {
            console.error('Error in revertToVersion:', error.message);
            throw new common_1.InternalServerErrorException(`Failed to revert course version: ${error.message}`);
        }
    }
    async getVersions(courseId) {
        const course = await this.courseModel.findOne({ courseId });
        if (!course) {
            throw new common_1.NotFoundException(`Course with ID ${courseId} not found.`);
        }
        return course.versions.map(({ version, updatedAt }) => ({ version, updatedAt }));
    }
    async addMultimedia(courseId, multimediaDto) {
        const course = await this.courseModel.findOne({ courseId });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        if (!Array.isArray(course.multimedia)) {
            course.multimedia = [];
        }
        const exists = course.multimedia.some((media) => media.url === multimediaDto.url);
        if (exists)
            throw new Error('Multimedia resource with this URL already exists.');
        const multimediaWithUploadedAt = {
            ...multimediaDto,
            uploadedAt: multimediaDto.uploadedAt || new Date(),
        };
        course.multimedia.push(multimediaWithUploadedAt);
        return course.save();
    }
    async removeMultimedia(courseId, multimediaId) {
        const course = await this.courseModel.findOne({ courseId });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        course.multimedia = course.multimedia.filter((media) => media._id.toString() !== multimediaId);
        return course.save();
    }
    async getMultimedia(courseId) {
        const course = await this.courseModel.findOne({ courseId });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        return course.multimedia;
    }
    async searchCourses(query, limit = 10, skip = 0) {
        return this.courseModel
            .find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { category: { $regex: query, $options: 'i' } },
                { createdBy: { $regex: query, $options: 'i' } },
            ],
        })
            .limit(limit)
            .skip(skip)
            .exec();
    }
    async searchStudents(query, limit = 10, skip = 0) {
        return this.studentModel
            .find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } },
                { id: { $regex: query, $options: 'i' } },
            ],
        })
            .limit(limit)
            .skip(skip)
            .exec();
    }
    async searchInstructors(query, limit = 10, skip = 0) {
        return this.instructorModel
            .find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } },
                { id: { $regex: query, $options: 'i' } },
            ],
        })
            .limit(limit)
            .skip(skip)
            .exec();
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __param(1, (0, mongoose_1.InjectModel)('Student')),
    __param(2, (0, mongoose_1.InjectModel)('Instructor')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], CourseService);
//# sourceMappingURL=course.service.js.map