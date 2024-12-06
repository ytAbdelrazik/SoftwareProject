import { Document } from 'mongoose';
export type CourseDocument = Course & Document;
export declare class Course {
    courseId: string;
    title: string;
    description: string;
    category: string;
    difficultyLevel: 'Beginner' | 'Intermediate' | 'Advanced';
    createdBy: string;
    createdAt: Date;
    multimedia: Array<{
        [x: string]: any;
        resourceType: 'video' | 'pdf' | 'image';
        url: string;
        title: string;
        description?: string;
        uploadedAt: Date;
    }>;
    versions: Array<{
        version: string;
        content: Record<string, any>;
        updatedAt: Date;
        uploadedAt?: Date;
    }>;
}
export declare const CourseSchema: import("mongoose").Schema<Course, import("mongoose").Model<Course, any, any, any, Document<unknown, any, Course> & Course & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Course, Document<unknown, {}, import("mongoose").FlatRecord<Course>> & import("mongoose").FlatRecord<Course> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
