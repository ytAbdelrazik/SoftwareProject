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
exports.ModuleController = void 0;
const common_1 = require("@nestjs/common");
const module_service_1 = require("./module.service");
const roles_guard_1 = require("../user-managment/roles.guard");
const roles_decorator_1 = require("../user-managment/roles.decorator");
const create_module_dto_1 = require("./dots/create-module.dto");
let ModuleController = class ModuleController {
    constructor(moduleService) {
        this.moduleService = moduleService;
    }
    async createModule(req, moduleDto) {
        const userId = req.user.userId;
        return this.moduleService.createModule(userId, moduleDto);
    }
    async getModulesForStudents(courseId) {
        return this.moduleService.getModulesForStudents(courseId);
    }
    async getModulesOrderedByDate(order = 'desc', req) {
        if (req.user.role !== 'instructor') {
            throw new common_1.UnauthorizedException('Only instructors can order modules');
        }
        return this.moduleService.getModulesOrderedByDate(order);
    }
    async updateModule(req, moduleId, updateData) {
        const userId = req.user.userId;
        return this.moduleService.updateModule(userId, moduleId, updateData);
    }
};
exports.ModuleController = ModuleController;
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('instructor'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_module_dto_1.CreateModuleDto]),
    __metadata("design:returntype", Promise)
], ModuleController.prototype, "createModule", null);
__decorate([
    (0, common_1.Get)(':courseId/modules'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('student'),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ModuleController.prototype, "getModulesForStudents", null);
__decorate([
    (0, common_1.Get)('ordered-by-date'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('instructor'),
    __param(0, (0, common_1.Query)('order')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ModuleController.prototype, "getModulesOrderedByDate", null);
__decorate([
    (0, common_1.Patch)(':moduleId'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('instructor'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('moduleId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ModuleController.prototype, "updateModule", null);
exports.ModuleController = ModuleController = __decorate([
    (0, common_1.Controller)('modules'),
    __metadata("design:paramtypes", [module_service_1.ModuleService])
], ModuleController);
//# sourceMappingURL=module.controller.js.map