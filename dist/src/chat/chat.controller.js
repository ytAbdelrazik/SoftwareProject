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
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const chat_service_1 = require("./chat.service");
let ChatController = class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    async createCourseGroupChat(userId, courseId, groupName) {
        if (!userId || !courseId || !groupName) {
            throw new common_1.BadRequestException('userId, courseId, and groupName are required.');
        }
        const chat = await this.chatService.createCourseGroupChat(userId, courseId, groupName);
        if (!chat) {
            throw new common_1.NotFoundException(`Failed to create group chat for course ${courseId}.`);
        }
        return chat;
    }
    async createOneToOneChat(userId1, userId2, courseId) {
        if (!userId1 || !userId2 || !courseId) {
            throw new common_1.BadRequestException('userId1, userId2, and courseId are required.');
        }
        const chat = await this.chatService.createOneToOneChat(userId1, userId2, courseId);
        if (!chat) {
            throw new common_1.NotFoundException('One-to-one chat creation failed.');
        }
        return chat;
    }
    async createStudyGroupChat(creatorId, groupName, participantIds, courseId) {
        if (!creatorId || !groupName || !participantIds || !courseId) {
            throw new common_1.BadRequestException('creatorId, groupName, participantIds, and courseId are required.');
        }
        return this.chatService.createStudyGroupChat(creatorId, groupName, participantIds, courseId);
    }
    async sendMessage(userId1, userId2, content, role) {
        if (userId1)
            if (!content) {
                throw new common_1.BadRequestException('content is required.');
            }
        const savedMessage = await this.chatService.saveOneToOneMessage(userId1, userId2, content, userId1, role);
        if (!savedMessage) {
            throw new common_1.NotFoundException('Failed to send message.');
        }
        return savedMessage;
    }
    async saveMessage(chatId, senderId, content, role) {
        if (!senderId || !content || !role) {
            throw new common_1.BadRequestException('senderId, content, and role are required.');
        }
        const createMessageDto = {
            chatId,
            senderId,
            content,
            role,
        };
        const savedMessage = await this.chatService.saveMessage(createMessageDto);
        if (!savedMessage) {
            throw new common_1.NotFoundException('Failed to save message.');
        }
        return savedMessage;
    }
    async joinChat(chatId, userId) {
        if (!userId || !chatId) {
            throw new common_1.BadRequestException('userId and chatId are required to join a chat.');
        }
        const chat = await this.chatService.joinchat(userId, chatId);
        return chat;
    }
    async deleteMessage(messageId, body) {
        const { userId } = body;
        const isDeleted = await this.chatService.deleteMessage(messageId, userId);
        if (!isDeleted) {
            throw new common_1.NotFoundException(`Message with ID ${messageId} not found.`);
        }
        return { message: 'Message deleted successfully.' };
    }
    async deleteChat(chatId, body) {
        const { userId } = body;
        const isDeleted = await this.chatService.deleteChat(chatId, userId);
        if (!isDeleted) {
            throw new common_1.NotFoundException(`Chat with ID ${chatId} not found.`);
        }
        return { message: 'Chat deleted successfully.' };
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Post)('course/:courseId/group'),
    __param(0, (0, common_1.Body)('userId')),
    __param(1, (0, common_1.Param)('courseId')),
    __param(2, (0, common_1.Body)('groupName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "createCourseGroupChat", null);
__decorate([
    (0, common_1.Post)('course/:courseId/one-to-one'),
    __param(0, (0, common_1.Body)('userId1')),
    __param(1, (0, common_1.Body)('userId2')),
    __param(2, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "createOneToOneChat", null);
__decorate([
    (0, common_1.Post)('course/:courseId/study-group'),
    __param(0, (0, common_1.Body)('creatorId')),
    __param(1, (0, common_1.Body)('groupName')),
    __param(2, (0, common_1.Body)('participantIds')),
    __param(3, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Array, String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "createStudyGroupChat", null);
__decorate([
    (0, common_1.Post)('one-to-one/:userId1/:userId2/message'),
    __param(0, (0, common_1.Param)('userId1')),
    __param(1, (0, common_1.Param)('userId2')),
    __param(2, (0, common_1.Body)('content')),
    __param(3, (0, common_1.Body)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Post)('message/:chatId'),
    __param(0, (0, common_1.Param)('chatId')),
    __param(1, (0, common_1.Body)('senderId')),
    __param(2, (0, common_1.Body)('content')),
    __param(3, (0, common_1.Body)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "saveMessage", null);
__decorate([
    (0, common_1.Post)('join'),
    __param(0, (0, common_1.Body)('chatId')),
    __param(1, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "joinChat", null);
__decorate([
    (0, common_1.Delete)('message/:messageId'),
    __param(0, (0, common_1.Param)('messageId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "deleteMessage", null);
__decorate([
    (0, common_1.Delete)(':chatId'),
    __param(0, (0, common_1.Param)('chatId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "deleteChat", null);
exports.ChatController = ChatController = __decorate([
    (0, common_1.Controller)('chat'),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
//# sourceMappingURL=chat.controller.js.map