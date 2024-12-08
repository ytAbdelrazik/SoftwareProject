import { Document } from 'mongoose';
export declare class Progress extends Document {
    progressId: string;
    userId: string;
    courseId: string;
    completionPercentage: number;
    lastAccessed: Date;
}
export declare const ProgressSchema: import("mongoose").Schema<Progress, import("mongoose").Model<Progress, any, any, any, Document<unknown, any, Progress> & Progress & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Progress, Document<unknown, {}, import("mongoose").FlatRecord<Progress>> & import("mongoose").FlatRecord<Progress> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
