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
const common_2 = require("@nestjs/common");
const course_service_1 = require("./course.service");
const create_course_dto_1 = require("./dots/create-course.dto");
const update_course_dto_1 = require("./dots/update-course.dto");
const add_multimedia_dto_1 = require("./dots/add-multimedia.dto");
const user_service_1 = require("../user-managment/user.service");
const common_3 = require("@nestjs/common");
const roles_guard_1 = require("../user-managment/roles.guard");
const roles_decorator_1 = require("../user-managment/roles.decorator");
let CourseController = class CourseController {
    constructor(courseService, UserService) {
        this.courseService = courseService;
        this.UserService = UserService;
    }
    async createCourse(insID, createCourseDto) {
        if (!insID) {
            throw new common_3.NotFoundException('Instructor ID is required');
        }
        const isadmin = await this.UserService.getUserById(insID);
        if (!(isadmin.role === 'instructor')) {
            throw new common_3.NotFoundException('Invalid instructor ID');
        }
        const isCourseExist = await this.courseService.courseExists(createCourseDto.courseId);
        if (isCourseExist) {
            throw new common_3.NotFoundException('Course ID already exists');
        }
        const course = this.courseService.createCourse(createCourseDto, insID);
        await this.updateInstructorCourses((await course).courseId, insID);
        return;
    }
    async getCourseById(courseId) {
        try {
            const course = await this.courseService.getCourseById(courseId);
            return course;
        }
        catch (error) {
            throw (error);
        }
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
    async searchCourses(query, limit = 10, skip = 0) {
        if (!query) {
            throw new common_3.NotFoundException('Query parameter is required for search');
        }
        return this.courseService.searchCourses(query, limit, skip);
    }
    async getAllEnrolledCourses(req) {
        const userId = req.user.userId;
        const role = req.user.role;
        if (role !== 'student') {
            throw new common_1.UnauthorizedException('Only students can view enrolled courses');
        }
        return this.courseService.getAllEnrolledCourses(userId);
    }
    async updateInstructorCourses(courseId, instructorId) {
        try {
            await this.courseService.updateINS(courseId, instructorId);
        }
        catch (error) {
            throw new Error(`Error updating instructor's courses: ${error.message}`);
        }
    }
    async searchInstructors(query, limit = 10, offset = 0) {
        if (!query) {
            throw new common_3.NotFoundException('Query parameter is required for search');
        }
        const instructors = await this.courseService.searchInstructors(query, limit, offset);
        if (!instructors || instructors.length === 0) {
            throw new common_3.NotFoundException(`No instructors found for query: "${query}"`);
        }
        return instructors;
    }
    async getStudentEnrolledCourses(studentId) {
        return this.courseService.getStudentEnrolledCourses(studentId);
    }
    async getCoursesOrderedByDate(order = 'asc') {
        if (!['asc', 'desc'].includes(order)) {
            throw new common_1.BadRequestException('Invalid order parameter. Use "asc" or "desc".');
        }
        return this.courseService.getCoursesOrderedByDate(order);
    }
    async getCompletedCourses(req) {
        const studentId = req.user.userId;
        return this.courseService.getCompletedCourses(studentId);
    }
    async getStudentsWhoCompletedCourse(req, courseId) {
        const instructorId = req.user.userId;
        return this.courseService.getStudentsWhoCompletedCourse(instructorId, courseId);
    }
    async addKeywordsToCourse(courseId, keywords, req) {
        const instructorId = req.user.userId;
        return this.courseService.addKeywordsToCourse(courseId, keywords, instructorId);
    }
};
exports.CourseController = CourseController;
__decorate([
    (0, common_2.Post)(),
    __param(0, (0, common_2.Body)('insID')),
    __param(1, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_course_dto_1.CreateCourseDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "createCourse", null);
__decorate([
    (0, common_2.Get)(':courseId'),
    __param(0, (0, common_2.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCourseById", null);
__decorate([
    (0, common_2.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getAllCourses", null);
__decorate([
    (0, common_2.Post)(':courseId'),
    __param(0, (0, common_2.Param)('courseId')),
    __param(1, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_course_dto_1.UpdateCourseDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "updateCourse", null);
__decorate([
    (0, common_2.Post)(':courseId/revert'),
    __param(0, (0, common_2.Param)('courseId')),
    __param(1, (0, common_2.Query)('version')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "revertToVersion", null);
__decorate([
    (0, common_2.Get)(':courseId/versions'),
    __param(0, (0, common_2.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getVersions", null);
__decorate([
    (0, common_2.Post)(':courseId/multimedia'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('instructor'),
    __param(0, (0, common_2.Param)('courseId')),
    __param(1, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, add_multimedia_dto_1.AddMultimediaDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "addMultimedia", null);
__decorate([
    (0, common_2.Delete)(':courseId/multimedia/:multimediaId'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('instructor'),
    __param(0, (0, common_2.Param)('courseId')),
    __param(1, (0, common_2.Param)('multimediaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "removeMultimedia", null);
__decorate([
    (0, common_2.Get)(':courseId/multimedia'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('instructor'),
    __param(0, (0, common_2.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getMultimedia", null);
__decorate([
    (0, common_2.Get)('search'),
    __param(0, (0, common_2.Query)('query')),
    __param(1, (0, common_2.Query)('limit')),
    __param(2, (0, common_2.Query)('skip')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "searchCourses", null);
__decorate([
    (0, common_2.Get)('students/enrolled-courses'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getAllEnrolledCourses", null);
__decorate([
    (0, common_2.Patch)(':courseId/instructor/:instructorId'),
    __param(0, (0, common_2.Param)('courseId')),
    __param(1, (0, common_2.Param)('instructorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "updateInstructorCourses", null);
__decorate([
    (0, common_2.Get)('instructors/search'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('student'),
    __param(0, (0, common_2.Query)('query')),
    __param(1, (0, common_2.Query)('limit')),
    __param(2, (0, common_2.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "searchInstructors", null);
__decorate([
    (0, common_2.Get)('students/:studentId/enrolled-courses'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('instructor'),
    __param(0, (0, common_2.Param)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getStudentEnrolledCourses", null);
__decorate([
    (0, common_2.Get)('order'),
    __param(0, (0, common_2.Query)('order')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCoursesOrderedByDate", null);
__decorate([
    (0, common_2.Get)('completed'),
    (0, roles_decorator_1.Roles)('student'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCompletedCourses", null);
__decorate([
    (0, common_2.Get)(':courseId/completed-students'),
    (0, roles_decorator_1.Roles)('instructor'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_2.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getStudentsWhoCompletedCourse", null);
__decorate([
    (0, common_2.Post)(':courseId/keywords'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('instructor'),
    __param(0, (0, common_2.Param)('courseId')),
    __param(1, (0, common_2.Body)('keywords')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "addKeywordsToCourse", null);
exports.CourseController = CourseController = __decorate([
    (0, common_2.Controller)('courses'),
    __metadata("design:paramtypes", [course_service_1.CourseService,
        user_service_1.UserService])
], CourseController);
//# sourceMappingURL=course.controller.js.map