import { CourseService } from './course.service';
import { CreateCourseDto } from './dots/create-course.dto';
import { UpdateCourseDto } from './dots/update-course.dto';
import { AddMultimediaDto } from './dots/add-multimedia.dto';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    createCourse(createCourseDto: CreateCourseDto): Promise<import("./course.schema").Course>;
    getAllCourses(): Promise<import("./course.schema").Course[]>;
    updateCourse(courseId: string, updateCourseDto: UpdateCourseDto): Promise<import("./course.schema").Course>;
    revertToVersion(courseId: string, version: string): Promise<import("./course.schema").Course>;
    getVersions(courseId: string): Promise<{
        version: string;
        updatedAt: Date;
    }[]>;
    addMultimedia(courseId: string, multimediaDto: AddMultimediaDto): Promise<import("./course.schema").Course>;
    removeMultimedia(courseId: string, multimediaId: string): Promise<import("./course.schema").Course>;
    getMultimedia(courseId: string): Promise<{
        resourceType: string;
        url: string;
        title: string;
    }[]>;
    searchCourses(query: string, limit?: number, offset?: number): Promise<import("./course.schema").Course[]>;
    searchStudents(query: string, limit?: number, offset?: number): Promise<any[]>;
    searchInstructors(query: string, limit?: number, offset?: number): Promise<any[]>;
}
