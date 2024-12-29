import { Document } from 'mongoose';
export declare class Comment extends Document {
    forumId: string;
    userId: string;
    role: string;
    content: string;
    createdAt: Date;
}
export declare const CommentSchema: import("mongoose").Schema<Comment, import("mongoose").Model<Comment, any, any, any, Document<unknown, any, Comment> & Comment & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Comment, Document<unknown, {}, import("mongoose").FlatRecord<Comment>> & import("mongoose").FlatRecord<Comment> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
