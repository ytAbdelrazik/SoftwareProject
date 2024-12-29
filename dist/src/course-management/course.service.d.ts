import { Model } from 'mongoose';
import { Course, CourseDocument } from './course.schema';
import { CreateCourseDto } from './dots/create-course.dto';
import { UpdateCourseDto } from './dots/update-course.dto';
import { StudentDocument } from './student.schema';
import { Instructor } from './instructor.schema';
import { AddMultimediaDto } from './dots/add-multimedia.dto';
import { UserService } from 'src/user-managment/user.service';
export declare class CourseService {
    private courseModel;
    private studentModel;
    private instructorModel;
    private readonly userService;
    constructor(courseModel: Model<CourseDocument>, studentModel: Model<StudentDocument>, instructorModel: Model<Instructor>, userService: UserService);
    createCourse(createCourseDto: CreateCourseDto, instructorId: string): Promise<Course>;
    updateINS(courseId: string, instructorId: string): Promise<void>;
    getAllCourses(): Promise<Course[]>;
    updateCourse(courseId: string, updateCourseDto: UpdateCourseDto): Promise<Course>;
    revertToVersion(courseId: string, version: string): Promise<Course>;
    getVersions(courseId: string): Promise<Array<{
        version: string;
        updatedAt: Date;
    }>>;
    addMultimedia(courseId: string, multimediaDto: AddMultimediaDto): Promise<Course>;
    getStudentEnrolledCourses(studentId: string): Promise<any[]>;
    getCourseById(courseId: string): Promise<Course>;
    courseExists(courseId: string): Promise<boolean>;
    removeMultimedia(courseId: string, multimediaId: string): Promise<Course>;
    getMultimedia(courseId: string): Promise<Array<{
        resourceType: string;
        url: string;
        title: string;
    }>>;
    searchCourses(query: string, limit?: number, skip?: number): Promise<Course[]>;
    getAllEnrolledCourses(userId: string): Promise<any[]>;
    searchInstructors(query: string, limit?: number, skip?: number): Promise<any[]>;
    getCoursesOrderedByDate(order: 'asc' | 'desc'): Promise<Course[]>;
    getCompletedCourses(studentId: string): Promise<any[]>;
    getStudentsWhoCompletedCourse(instructorId: string, courseId: string): Promise<any[]>;
    addKeywordsToCourse(courseId: string, keywords: string[], instructorId: string): Promise<any>;
}
