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
    createUser(userData: any): Promise<User>;
    findByEmail(email: string): Promise<any | null>;
    findById(userId: string, role: string): Promise<User | null>;
    getAllByRole(role: string): Promise<User[]>;
}
