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
exports.CourseController = void 0;
const common_1 = require("@nestjs/common");
const course_service_1 = require("./course.service");
const create_course_dto_1 = require("./dots/create-course.dto");
const update_course_dto_1 = require("./dots/update-course.dto");
const add_multimedia_dto_1 = require("./dots/add-multimedia.dto");
let CourseController = class CourseController {
    constructor(courseService) {
        this.courseService = courseService;
    }
    async createCourse(createCourseDto) {
        return this.courseService.createCourse(createCourseDto);
    }
    async getAllCourses() {
        return this.courseService.getAllCourses();
    }
    async updateCourse(courseId, updateCourseDto) {
        return this.courseService.updateCourse(courseId, updateCourseDto);
    }
    async revertToVersion(courseId, version) {
        return this.courseService.revertToVersion(courseId, version);
    }
    async getVersions(courseId) {
        return this.courseService.getVersions(courseId);
    }
    async addMultimedia(courseId, multimediaDto) {
        return this.courseService.addMultimedia(courseId, multimediaDto);
    }
    async removeMultimedia(courseId, multimediaId) {
        return this.courseService.removeMultimedia(courseId, multimediaId);
    }
    async getMultimedia(courseId) {
        return this.courseService.getMultimedia(courseId);
    }
    async searchCourses(query, limit = 10, offset = 0) {
        return this.courseService.searchCourses(query, limit, offset);
    }
    async searchStudents(query, limit = 10, offset = 0) {
        return this.courseService.searchStudents(query, limit, offset);
    }
    async searchInstructors(query, limit = 10, offset = 0) {
        return this.courseService.searchInstructors(query, limit, offset);
    }
};
exports.CourseController = CourseController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_dto_1.CreateCourseDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "createCourse", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getAllCourses", null);
__decorate([
    (0, common_1.Post)(':courseId'),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_course_dto_1.UpdateCourseDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "updateCourse", null);
__decorate([
    (0, common_1.Post)(':courseId/revert'),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Query)('version')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "revertToVersion", null);
__decorate([
    (0, common_1.Get)(':courseId/versions'),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getVersions", null);
__decorate([
    (0, common_1.Post)(':courseId/multimedia'),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, add_multimedia_dto_1.AddMultimediaDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "addMultimedia", null);
__decorate([
    (0, common_1.Delete)(':courseId/multimedia/:multimediaId'),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Param)('multimediaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "removeMultimedia", null);
__decorate([
    (0, common_1.Get)(':courseId/multimedia'),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getMultimedia", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "searchCourses", null);
__decorate([
    (0, common_1.Get)('students/search'),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "searchStudents", null);
__decorate([
    (0, common_1.Get)('instructors/search'),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "searchInstructors", null);
exports.CourseController = CourseController = __decorate([
    (0, common_1.Controller)('courses'),
    __metadata("design:paramtypes", [course_service_1.CourseService])
], CourseController);
//# sourceMappingURL=course.controller.js.map