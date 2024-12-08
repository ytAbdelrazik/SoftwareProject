import { Model } from 'mongoose';
import { Student } from '../course-management/student.schema';
import { Instructor } from '../course-management/instructor.schema';
import { User } from './users.schema';
export declare class UserService {
    private readonly studentModel;
    private readonly instructorModel;
    private readonly adminModel;
    constructor(studentModel: Model<Student>, instructorModel: Model<Instructor>, adminModel: Model<User>);
    private getModelByRole;
    private generateUserId;
    createUser(userData: any): Promise<any>;
    updateUser(userId: string, role: string, updateData: any): Promise<any>;
    getAllByRole(role: string): Promise<any[]>;
    getEnrolledCourses(userId: string): Promise<any[]>;
    getCreatedCourses(userId: string): Promise<any[]>;
    findByEmail(email: string): Promise<any | null>;
    findById(userId: string, role: string): Promise<any | null>;
    addCoursesToStudent(userId: string, courseIds: string[]): Promise<any>;
    addCoursesToInstructor(userId: string, courseIds: string[]): Promise<any>;
}
