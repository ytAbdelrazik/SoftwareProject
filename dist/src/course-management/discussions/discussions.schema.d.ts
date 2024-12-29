import { Document } from 'mongoose';
export declare class Discussion extends Document {
    courseId: string;
    userId: string;
    role: string;
    content: string;
    createdAt: Date;
}
export declare const DiscussionSchema: import("mongoose").Schema<Discussion, import("mongoose").Model<Discussion, any, any, any, Document<unknown, any, Discussion> & Discussion & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Discussion, Document<unknown, {}, import("mongoose").FlatRecord<Discussion>> & import("mongoose").FlatRecord<Discussion> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
