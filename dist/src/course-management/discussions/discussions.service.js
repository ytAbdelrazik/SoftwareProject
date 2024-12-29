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
exports.DiscussionsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const discussions_schema_1 = require("./discussions.schema");
const comments_schema_1 = require("./comments.schema");
let DiscussionsService = class DiscussionsService {
    constructor(discussionModel, commentModel) {
        this.discussionModel = discussionModel;
        this.commentModel = commentModel;
    }
    async getDiscussionsByCourse(courseId) {
        return this.discussionModel.find({ courseId }).sort({ createdAt: -1 }).exec();
    }
    async createDiscussion(courseId, userId, role, content) {
        const newDiscussion = new this.discussionModel({
            courseId,
            userId,
            role,
            content,
        });
        return newDiscussion.save();
    }
    async getCommentsByForum(forumId) {
        return this.commentModel.find({ forumId }).sort({ createdAt: -1 }).exec();
    }
    async createComment(forumId, userId, role, content) {
        const newComment = new this.commentModel({
            forumId,
            userId,
            role,
            content,
        });
        return newComment.save();
    }
};
exports.DiscussionsService = DiscussionsService;
exports.DiscussionsService = DiscussionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(discussions_schema_1.Discussion.name)),
    __param(1, (0, mongoose_1.InjectModel)(comments_schema_1.Comment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], DiscussionsService);
//# sourceMappingURL=discussions.service.js.map