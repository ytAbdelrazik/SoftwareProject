import { CourseService } from './course.service';
import { CreateCourseDto } from './dots/create-course.dto';
import { UpdateCourseDto } from './dots/update-course.dto';
import { AddMultimediaDto } from './dots/add-multimedia.dto';
import { UserService } from 'src/user-managment/user.service';
import { Course } from './course.schema';
export declare class CourseController {
    private readonly courseService;
    private readonly UserService;
    constructor(courseService: CourseService, UserService: UserService);
    createCourse(insID: string, createCourseDto: CreateCourseDto): Promise<void>;
    getCourseById(courseId: string): Promise<Course>;
    getAllCourses(): Promise<Course[]>;
    updateCourse(courseId: string, updateCourseDto: UpdateCourseDto): Promise<Course>;
    revertToVersion(courseId: string, version: string): Promise<Course>;
    getVersions(courseId: string): Promise<{
        version: string;
        updatedAt: Date;
    }[]>;
    addMultimedia(courseId: string, multimediaDto: AddMultimediaDto): Promise<Course>;
    removeMultimedia(courseId: string, multimediaId: string): Promise<Course>;
    getMultimedia(courseId: string): Promise<{
        resourceType: string;
        url: string;
        title: string;
    }[]>;
    searchCourses(query: string, limit?: number, skip?: number): Promise<Course[]>;
    getAllEnrolledCourses(req: any): Promise<any[]>;
    updateInstructorCourses(courseId: string, instructorId: string): Promise<void>;
    searchInstructors(query: string, limit?: number, offset?: number): Promise<any[]>;
    getStudentEnrolledCourses(studentId: string): Promise<any[]>;
    getCoursesOrderedByDate(order?: 'asc' | 'desc'): Promise<Course[]>;
    getCompletedCourses(req: any): Promise<any[]>;
    getStudentsWhoCompletedCourse(req: any, courseId: string): Promise<any[]>;
    addKeywordsToCourse(courseId: string, keywords: string[], req: any): Promise<any>;
}
