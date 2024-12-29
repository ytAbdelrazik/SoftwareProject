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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_service_1 = require("./user.service");
const CreateUser_dto_1 = require("./dots/CreateUser.dto");
const roles_guard_1 = require("./roles.guard");
const roles_decorator_1 = require("./roles.decorator");
const instructor_schema_1 = require("../course-management/instructor.schema");
const student_schema_1 = require("../course-management/student.schema");
const bcrypt = require("bcrypt");
let UserController = class UserController {
    constructor(userService, failedLoginModel, courseModel) {
        this.userService = userService;
        this.failedLoginModel = failedLoginModel;
        this.courseModel = courseModel;
    }
    async getUserById(userId) {
        const user = await this.userService.getUserById(userId);
        return user;
    }
    async createUser(createUserDto) {
        try {
            return await this.userService.createUser(createUserDto);
        }
        catch (error) {
            console.error('Error in createUser:', error.message);
            throw error;
        }
    }
    async updateProfile(req, updateData) {
        const userId = req.user.userId;
        const role = req.user.role;
        if (role !== 'student' && role !== 'instructor') {
            throw new common_1.UnauthorizedException('Only students and instructors can update their profiles');
        }
        if (updateData.password) {
            updateData.passwordHash = await bcrypt.hash(updateData.password, 10);
            delete updateData.password;
        }
        return this.userService.updateUser(userId, role, updateData);
    }
    async getAllStudents() {
        return this.userService.getAllByRole('student');
    }
    async getAllInstructors() {
        return this.userService.getAllByRole('instructor');
    }
    async getEnrolledCourses(userId) {
        const user = await this.userService.getUserById(userId);
        if (user instanceof student_schema_1.Student) {
            return user.enrolledCourses;
        }
        throw new Error('User is not a student');
    }
    async getCreatedCourses(userId) {
        const user = await this.userService.getUserById(userId);
        if (user instanceof instructor_schema_1.Instructor) {
            return user.createdCourses;
        }
        throw new Error('User is not an instructor');
    }
    async searchStudents(name, limit = 10, offset = 0) {
        if (!name) {
            throw new common_1.NotFoundException('Name parameter is required for search');
        }
        const students = await this.userService.searchStudentsByName(name, limit, offset);
        if (!students || students.length === 0) {
            throw new common_1.NotFoundException(`No students found for name: "${name}"`);
        }
        return students;
    }
    async getFailedLogins() {
        return this.failedLoginModel.find().sort({ timestamp: -1 }).exec();
    }
    async updateCourseAvailability(courseId, isAvailable) {
        return this.userService.updateCourseAvailability(courseId, isAvailable);
    }
    async deleteUserByAdmin(userId) {
        return this.userService.deleteUser(userId);
    }
    async deleteSelf(req) {
        const userId = req.user.userId;
        return this.userService.deleteUser(userId);
    }
    async addCoursesToStudent(userId, courseIds) {
        return this.userService.addCoursesToStudent(userId, courseIds);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('getUser/byId'),
    __param(0, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUser_dto_1.CreateUserdto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Patch)('profile'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)('students'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllStudents", null);
__decorate([
    (0, common_1.Get)('instructors'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllInstructors", null);
__decorate([
    (0, common_1.Get)(':userId/enrolled-courses'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getEnrolledCourses", null);
__decorate([
    (0, common_1.Get)(':userId/created-courses'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getCreatedCourses", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('instructor'),
    __param(0, (0, common_1.Query)('name')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "searchStudents", null);
__decorate([
    (0, common_1.Get)('failed-logins'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getFailedLogins", null);
__decorate([
    (0, common_1.Patch)('courses/:courseId/availability'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Body)('isAvailable')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateCourseAvailability", null);
__decorate([
    (0, common_1.Delete)('users/:userId'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUserByAdmin", null);
__decorate([
    (0, common_1.Delete)('users/self'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('student', 'instructor', 'admin'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteSelf", null);
__decorate([
    (0, common_1.Patch)(':userId/add-courses/student'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)('courseIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addCoursesToStudent", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __param(1, (0, mongoose_1.InjectModel)('FailedLogin')),
    __param(2, (0, mongoose_1.InjectModel)('Course')),
    __metadata("design:paramtypes", [user_service_1.UserService,
        mongoose_2.Model,
        mongoose_2.Model])
], UserController);
//# sourceMappingURL=user.controller.js.map