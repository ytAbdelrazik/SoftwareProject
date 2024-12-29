import { Document } from 'mongoose';
export type UserInteractionDocument = UserInteraction & Document;
export declare class UserInteraction {
    interactionId: string;
    userId: string;
    courseId: string;
    score: number;
    timeSpentMinutes: number;
    lastAccessed: Date;
}
export declare const UserInteractionSchema: import("mongoose").Schema<UserInteraction, import("mongoose").Model<UserInteraction, any, any, any, Document<unknown, any, UserInteraction> & UserInteraction & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserInteraction, Document<unknown, {}, import("mongoose").FlatRecord<UserInteraction>> & import("mongoose").FlatRecord<UserInteraction> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
