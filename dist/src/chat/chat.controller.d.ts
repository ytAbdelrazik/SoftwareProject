import { ChatService } from './chat.service';
import { Message } from './message.schema';
import { Chat } from './chat.schema';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    createCourseGroupChat(userId: string, courseId: string, groupName: string): Promise<Chat>;
    createOneToOneChat(userId1: string, userId2: string, courseId: string): Promise<Chat>;
    createStudyGroupChat(creatorId: string, groupName: string, participantIds: string[], courseId: string): Promise<Chat>;
    sendMessage(userId1: string, userId2: string, content: string, role: 'student' | 'instructor'): Promise<Message>;
    saveMessage(chatId: string, senderId: string, content: string, role: 'student' | 'instructor'): Promise<Message>;
    joinChat(chatId: string, userId: string): Promise<Chat>;
    deleteMessage(messageId: string, body: {
        userId: string;
    }): Promise<{
        message: string;
    }>;
    deleteChat(chatId: string, body: {
        userId: string;
    }): Promise<{
        message: string;
    }>;
}
