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
exports.DiscussionsController = void 0;
const common_1 = require("@nestjs/common");
const discussions_service_1 = require("./discussions.service");
let DiscussionsController = class DiscussionsController {
    constructor(discussionsService) {
        this.discussionsService = discussionsService;
    }
    async getDiscussions(courseId) {
        return this.discussionsService.getDiscussionsByCourse(courseId);
    }
    async createDiscussion(courseId, content, req) {
        const userId = req.user.userId;
        const role = req.user.role;
        return this.discussionsService.createDiscussion(courseId, userId, role, content);
    }
    async getComments(forumId) {
        return this.discussionsService.getCommentsByForum(forumId);
    }
    async createComment(forumId, content, req) {
        const userId = req.user.userId;
        const role = req.user.role;
        return this.discussionsService.createComment(forumId, userId, role, content);
    }
};
exports.DiscussionsController = DiscussionsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DiscussionsController.prototype, "getDiscussions", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Body)('content')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], DiscussionsController.prototype, "createDiscussion", null);
__decorate([
    (0, common_1.Get)(':forumId/comments'),
    __param(0, (0, common_1.Param)('forumId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DiscussionsController.prototype, "getComments", null);
__decorate([
    (0, common_1.Post)(':forumId/comments'),
    __param(0, (0, common_1.Param)('forumId')),
    __param(1, (0, common_1.Body)('content')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], DiscussionsController.prototype, "createComment", null);
exports.DiscussionsController = DiscussionsController = __decorate([
    (0, common_1.Controller)('courses/:courseId/forums'),
    __metadata("design:paramtypes", [discussions_service_1.DiscussionsService])
], DiscussionsController);
//# sourceMappingURL=discussions.controller.js.map