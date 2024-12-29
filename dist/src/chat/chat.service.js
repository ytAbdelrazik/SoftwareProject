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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const message_schema_1 = require("./message.schema");
const user_service_1 = require("../user-managment/user.service");
const course_schema_1 = require("../course-management/course.schema");
const course_service_1 = require("../course-management/course.service");
const chat_schema_1 = require("./chat.schema");
const notifications_service_1 = require("../notifications/notifications.service");
let ChatService = class ChatService {
    constructor(chatModel, messageModel, courseModel, courseService, userService, notificationService) {
        this.chatModel = chatModel;
        this.messageModel = messageModel;
        this.courseModel = courseModel;
        this.courseService = courseService;
        this.userService = userService;
        this.notificationService = notificationService;
    }
    async createCourseGroupChat(userId, courseId, groupName) {
        const user = await this.userService.getUserById(userId);
        const course = await this.courseService.getCourseById(courseId);
        if (!user || !course) {
            throw new common_1.NotFoundException('User or Course not found.');
        }
        let isInstructor = false;
        if (user.role === 'instructor') {
            isInstructor = await this.userService.istheinstructorInCourse(courseId, userId);
        }
        const isEnrolled = await this.userService.isStudentEnrolledInCourse(courseId, userId);
        if (!isEnrolled && !isInstructor) {
            throw new common_1.BadRequestException('Creator must be enrolled in or teaching the course to create a group chat.');
        }
        const existingChats = await this.chatModel.find({ courseId });
        const chat = await this.chatModel.create({
            chatId: `course-${courseId}-${existingChats.length + 1}`,
            chatType: 'course',
            participants: [userId],
            courseId,
            groupName: groupName,
        });
        return chat;
    }
    async createOneToOneChat(userId1, userId2, courseId) {
        const user1 = await this.userService.getUserById(userId1);
        const user2 = await this.userService.getUserById(userId2);
        if (!user1 || !user2) {
            throw new common_1.NotFoundException('One or more users not found.');
        }
        const user1Enrolled = await this.userService.isStudentEnrolledInCourse(courseId, userId1);
        if (user2.role === 'instructor' || user2.role === 'admin') {
            throw new common_1.BadRequestException('canot invite this user to chat');
        }
        else {
            const user2Enrolled = await this.userService.isStudentEnrolledInCourse(courseId, userId2);
            if ((!user1Enrolled) || (!user2Enrolled)) {
                throw new common_1.BadRequestException('Both users must be enrolled in or teaching the same course.');
            }
            const chatId = [userId1, userId2].sort().join('-');
            const existingChat = await this.chatModel.findOne({ chatId });
            if (existingChat) {
                return existingChat;
            }
            const chat = await this.chatModel.create({
                chatId,
                chatType: 'one-to-one',
                participants: [userId1, userId2],
                courseId,
            });
            return chat;
        }
    }
    async createStudyGroupChat(creatorId, groupName, participantIds, courseId) {
        const creator = await this.userService.getUserById(creatorId);
        const course = await this.courseService.getCourseById(courseId);
        if (!creator || !course) {
            throw new common_1.NotFoundException('Creator or course not found.');
        }
        const isCreatorEligible = (creator.role === 'student' && (await this.userService.isStudentEnrolledInCourse(courseId, creatorId))) ||
            (creator.role === 'instructor' && (await this.userService.istheinstructorInCourse(courseId, creatorId)));
        if (!isCreatorEligible) {
            throw new common_1.BadRequestException('Creator must be enrolled in or teaching the course.');
        }
        for (const participantId of participantIds) {
            const participant = await this.userService.getUserById(participantId);
            if (!participant) {
                throw new common_1.BadRequestException(`Participant with ID ${participantId} not found.`);
            }
            if (participant.role === 'instructor' || participant.role === 'admin') {
                throw new common_1.BadRequestException(`Cannot add participant with role ${participant.role}.`);
            }
            const isParticipantEnrolled = await this.userService.isStudentEnrolledInCourse(courseId, participantId);
            if (!isParticipantEnrolled) {
                throw new common_1.BadRequestException(`Participant ${participantId} must be enrolled in the course.`);
            }
        }
        const chat = await this.chatModel.create({
            chatId: groupName,
            chatType: 'group',
            participants: [creatorId, ...participantIds],
            groupName,
            courseId,
        });
        return chat;
    }
    async joinchat(userId, chatId) {
        const user = await this.userService.getUserById(userId);
        const chat = await this.chatModel.findOne({ chatId }).exec();
        if (!user || !chat) {
            throw new common_1.NotFoundException('User or Chat not found.');
        }
        let isEnrolled = false;
        let isInstructor = false;
        if (user.role === 'student')
            isEnrolled = await this.userService.isStudentEnrolledInCourse(chat.courseId, userId);
        if (user.role === 'instructor')
            isInstructor = await this.userService.istheinstructorInCourse(chat.courseId, userId);
        if (!isEnrolled && !isInstructor) {
            throw new common_1.BadRequestException('User must be enrolled in or teaching the course to join the chat.');
        }
        if (!chat.participants.includes(userId)) {
            chat.participants.push(userId);
            await chat.save();
        }
        return chat;
    }
    async saveMessage(createMessageDto) {
        const { chatId, senderId, content, role } = createMessageDto;
        const chat = await this.chatModel.findOne({ chatId }).exec();
        if (!chat) {
            throw new common_1.NotFoundException(`Chat with ID ${chatId} not found.`);
        }
        const message = await this.messageModel.create({
            chatId,
            senderId,
            content,
            role,
            timestamp: new Date(),
            isDeleted: false,
        });
        chat.messages.push(message._id);
        await chat.save();
        const notificationMessage = `You have a new message from ${senderId}`;
        await this.notificationService.createNotification(senderId, notificationMessage, 'message');
        return message;
    }
    async saveOneToOneMessage(userId1, userId2, content, senderId, role) {
        const chatId = [userId1, userId2].sort().join('-');
        const chat = await this.chatModel.findOne({ chatId });
        if (!chat) {
            throw new common_1.NotFoundException(`Chat between users not found.`);
        }
        const message = await this.messageModel.create({
            chatId,
            senderId,
            content,
            role,
            timestamp: new Date(),
            isDeleted: false,
        });
        chat.messages.push(message._id);
        await chat.save();
        const notificationMessage = `You have a new message from ${senderId}`;
        await this.notificationService.createNotification(senderId, notificationMessage, 'message');
        return message;
    }
    async deleteMessage(messageId, userId) {
        const message = await this.messageModel.findById(messageId).exec();
        if (!message) {
            throw new common_1.NotFoundException('Message not found.');
        }
        const chatId = message.chatId;
        const chat = await this.chatModel.findOne({ chatId }).exec();
        if (!chat) {
            throw new common_1.NotFoundException('Chat not found.');
        }
        if (!chat.participants.includes(userId) && message.senderId !== userId) {
            throw new common_1.BadRequestException('User is not authorized to delete this message.');
        }
        message.isDeleted = true;
        await message.save();
        return true;
    }
    async deleteChat(chatId, userId) {
        const chat = await this.chatModel.findOne({ chatId }).exec();
        const user = await this.userService.getUserById(userId);
        if (!chat) {
            throw new common_1.NotFoundException('Chat not found.');
        }
        if (!user) {
            throw new common_1.NotFoundException('User not found.');
        }
        let isInstructorOrAdmin = false;
        if (user.role === 'instructor') {
            isInstructorOrAdmin = await this.userService.istheinstructorInCourse(chat.courseId, userId);
        }
        else if (user.role === 'admin') {
            isInstructorOrAdmin = true;
        }
        if (!isInstructorOrAdmin) {
            throw new common_1.BadRequestException('Only the instructor of this course or admins can delete this chat.');
        }
        chat.isActive = false;
        await chat.save();
        return true;
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(chat_schema_1.Chat.name)),
    __param(1, (0, mongoose_1.InjectModel)(message_schema_1.Message.name)),
    __param(2, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        course_service_1.CourseService,
        user_service_1.UserService,
        notifications_service_1.NotificationService])
], ChatService);
//# sourceMappingURL=chat.service.js.map