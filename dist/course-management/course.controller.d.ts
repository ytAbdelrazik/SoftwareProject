import { CourseService } from './course.service';
import { CreateCourseDto } from './dots/create-course.dto';
import { UpdateCourseDto } from './dots/update-course.dto';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    getAllCourses(): Promise<import("./course.schema").Course[]>;
    createCourse(createCourseDto: CreateCourseDto): Promise<import("./course.schema").Course>;
    updateCourse(courseId: string, updateCourseDto: UpdateCourseDto): Promise<import("./course.schema").Course>;
    revertToVersion(courseId: string, version: string): Promise<import("./course.schema").Course>;
    getVersions(courseId: string): Promise<{
        version: string;
        updatedAt: Date;
    }[]>;
    addMultimedia(courseId: string, multimediaUrl: string): Promise<import("./course.schema").Course>;
}
