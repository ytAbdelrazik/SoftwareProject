import { Model } from 'mongoose';
import { Message } from './message.schema';
import { UserService } from 'src/user-managment/user.service';
import { Course } from 'src/course-management/course.schema';
import { CourseService } from 'src/course-management/course.service';
import { Chat } from './chat.schema';
import { CreateMessageDto } from './createmsg.dto';
import { NotificationService } from 'src/notifications/notifications.service';
export declare class ChatService {
    private readonly chatModel;
    private readonly messageModel;
    private readonly courseModel;
    private readonly courseService;
    private readonly userService;
    private readonly notificationService;
    constructor(chatModel: Model<Chat>, messageModel: Model<Message>, courseModel: Model<Course>, courseService: CourseService, userService: UserService, notificationService: NotificationService);
    createCourseGroupChat(userId: string, courseId: string, groupName: string): Promise<Chat>;
    createOneToOneChat(userId1: string, userId2: string, courseId: string): Promise<Chat>;
    createStudyGroupChat(creatorId: string, groupName: string, participantIds: string[], courseId: string): Promise<Chat>;
    joinchat(userId: string, chatId: string): Promise<Chat>;
    saveMessage(createMessageDto: CreateMessageDto): Promise<Message>;
    saveOneToOneMessage(userId1: string, userId2: string, content: string, senderId: string, role: 'student' | 'instructor'): Promise<Message>;
    deleteMessage(messageId: string, userId: string): Promise<boolean>;
    deleteChat(chatId: string, userId: string): Promise<boolean>;
}
