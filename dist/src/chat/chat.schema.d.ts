import { Document } from 'mongoose';
import { Types } from 'mongoose';
export declare class Chat extends Document {
    chatId: string;
    chatType: string;
    participants: string[];
    courseId?: string;
    title?: string;
    messages: Types.ObjectId[];
    isActive: boolean;
}
export declare const ChatSchema: import("mongoose").Schema<Chat, import("mongoose").Model<Chat, any, any, any, Document<unknown, any, Chat> & Chat & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Chat, Document<unknown, {}, import("mongoose").FlatRecord<Chat>> & import("mongoose").FlatRecord<Chat> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
