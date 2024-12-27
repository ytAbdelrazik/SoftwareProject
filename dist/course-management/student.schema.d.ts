import { Document } from 'mongoose';
export type StudentDocument = Student & Document;
export declare class Student {
    userId: string;
    name: string;
    passwordHash: string;
    email: string;
    enrolledCourses: string[];
    createdAt: Date;
}
export declare const StudentSchema: import("mongoose").Schema<Student, import("mongoose").Model<Student, any, any, any, Document<unknown, any, Student> & Student & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Student, Document<unknown, {}, import("mongoose").FlatRecord<Student>> & import("mongoose").FlatRecord<Student> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
