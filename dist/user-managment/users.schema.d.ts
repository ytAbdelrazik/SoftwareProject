import { Document } from 'mongoose';
export declare class User extends Document {
    userId: string;
    name: string;
    email: string;
    passwordHash: string;
    role: 'student' | 'instructor' | 'admin';
    profilePictureUrl?: string;
    createdAt: Date;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User> & User & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
