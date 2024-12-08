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
let UserController = class UserController {
    constructor(userService, failedLoginModel) {
        this.userService = userService;
        this.failedLoginModel = failedLoginModel;
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
    async updateUser(userId, role, updateData) {
        return this.userService.updateUser(userId, role, updateData);
    }
    async getAllStudents() {
        return this.userService.getAllByRole('student');
    }
    async getAllInstructors() {
        return this.userService.getAllByRole('instructor');
    }
    async getEnrolledCourses(userId) {
        return this.userService.getEnrolledCourses(userId);
    }
    async getCreatedCourses(userId) {
        return this.userService.getCreatedCourses(userId);
    }
    async addCoursesToStudent(userId, courseIds) {
        return this.userService.addCoursesToStudent(userId, courseIds);
    }
    async addCoursesToInstructor(userId, courseIds) {
        return this.userService.addCoursesToInstructor(userId, courseIds);
    }
    async getFailedLogins() {
        return this.failedLoginModel.find().sort({ timestamp: -1 }).exec();
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUser_dto_1.CreateUserdto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Patch)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Query)('role')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
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
    (0, common_1.Patch)(':userId/add-courses/student'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)('courseIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addCoursesToStudent", null);
__decorate([
    (0, common_1.Patch)(':userId/add-courses/instructor'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)('courseIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addCoursesToInstructor", null);
__decorate([
    (0, common_1.Get)('failed-logins'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getFailedLogins", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __param(1, (0, mongoose_1.InjectModel)('FailedLogin')),
    __metadata("design:paramtypes", [user_service_1.UserService,
        mongoose_2.Model])
], UserController);
//# sourceMappingURL=user.controller.js.map