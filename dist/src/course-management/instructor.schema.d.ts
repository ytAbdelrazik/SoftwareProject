import { Document } from 'mongoose';
import { User } from 'src/user-managment/users.schema';
import { Course } from './course.schema';
export type InstructorDocument = Instructor & Document;
export declare class Instructor extends User {
    userId: string;
    name: string;
    email: string;
    passwordHash: string;
    expertise: string[];
    createdCourses: Course[];
    createdAt: Date;
}
export declare const InstructorSchema: import("mongoose").Schema<Instructor, import("mongoose").Model<Instructor, any, any, any, Document<unknown, any, Instructor> & Instructor & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Instructor, Document<unknown, {}, import("mongoose").FlatRecord<Instructor>> & import("mongoose").FlatRecord<Instructor> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
