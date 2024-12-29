import { Document } from 'mongoose';
export type ModuleDocument = Module & Document;
export declare class Module {
    moduleId: string;
    courseId: string;
    title: string;
    content: string;
    resources?: string[];
    createdBy: string;
    createdAt: Date;
    isOutdated: boolean;
}
export declare const ModuleSchema: import("mongoose").Schema<Module, import("mongoose").Model<Module, any, any, any, Document<unknown, any, Module> & Module & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Module, Document<unknown, {}, import("mongoose").FlatRecord<Module>> & import("mongoose").FlatRecord<Module> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
