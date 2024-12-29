import { Document } from 'mongoose';
import { Course } from './course.schema';
import { User } from 'src/user-managment/users.schema';
export type StudentDocument = Student & Document;
export declare class Student extends User {
    userId: string;
    name: string;
    passwordHash: string;
    email: string;
    enrolledCourses: Course[];
    createdAt: Date;
    completedCourses: {
        courseId: string;
        completionDate: Date;
        score: number;
    }[];
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
