import { Model } from 'mongoose';
import { UserService } from './user.service';
import { CreateUserdto } from './dots/CreateUser.dto';
import { FailedLoginDocument } from './failed-login.schema';
export declare class UserController {
    private readonly userService;
    private readonly failedLoginModel;
    constructor(userService: UserService, failedLoginModel: Model<FailedLoginDocument>);
    createUser(createUserDto: CreateUserdto): Promise<any>;
    updateUser(userId: string, role: string, updateData: any): Promise<any>;
    getAllStudents(): Promise<any[]>;
    getAllInstructors(): Promise<any[]>;
    getEnrolledCourses(userId: string): Promise<any[]>;
    getCreatedCourses(userId: string): Promise<any[]>;
    addCoursesToStudent(userId: string, courseIds: string[]): Promise<any>;
    addCoursesToInstructor(userId: string, courseIds: string[]): Promise<any>;
    getFailedLogins(): Promise<any>;
}
