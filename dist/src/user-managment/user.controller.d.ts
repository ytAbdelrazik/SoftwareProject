import { Model } from 'mongoose';
import { UserService } from './user.service';
import { CreateUserdto } from './dots/CreateUser.dto';
import { FailedLoginDocument } from './failed-login.schema';
import { Course } from 'src/course-management/course.schema';
import { Instructor } from 'src/course-management/instructor.schema';
import { Student } from 'src/course-management/student.schema';
export declare class UserController {
    private readonly userService;
    private readonly failedLoginModel;
    private readonly courseModel;
    constructor(userService: UserService, failedLoginModel: Model<FailedLoginDocument>, courseModel: Model<Course>);
    getUserById(userId: string): Promise<Student | Instructor | import("./admin.schema").Admin>;
    createUser(createUserDto: CreateUserdto): Promise<any>;
    updateProfile(req: any, updateData: any): Promise<any>;
    getAllStudents(): Promise<any[]>;
    getAllInstructors(): Promise<any[]>;
    getEnrolledCourses(userId: string): Promise<Course[]>;
    getCreatedCourses(userId: string): Promise<Course[]>;
    searchStudents(name: string, limit?: number, offset?: number): Promise<Student[]>;
    getFailedLogins(): Promise<any>;
    updateCourseAvailability(courseId: string, isAvailable: boolean): Promise<Course>;
    deleteUserByAdmin(userId: string): Promise<void>;
    deleteSelf(req: any): Promise<void>;
    addCoursesToStudent(userId: string, courseIds: string[]): Promise<any>;
}
