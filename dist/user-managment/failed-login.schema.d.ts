import { Document } from 'mongoose';
export type FailedLoginDocument = FailedLogin & Document;
export declare class FailedLogin {
    email: string;
    reason: string;
    ipAddress?: string;
    userAgent?: string;
    timestamp: Date;
}
export declare const FailedLoginSchema: import("mongoose").Schema<FailedLogin, import("mongoose").Model<FailedLogin, any, any, any, Document<unknown, any, FailedLogin> & FailedLogin & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, FailedLogin, Document<unknown, {}, import("mongoose").FlatRecord<FailedLogin>> & import("mongoose").FlatRecord<FailedLogin> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
