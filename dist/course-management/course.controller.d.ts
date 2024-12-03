import { CourseService } from './course.service';
import { CreateCourseDto } from './dots/create-course.dto';
import { UpdateCourseDto } from './dots/update-course.dto';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    createCourse(createCourseDto: CreateCourseDto): Promise<import("./course.schema").Course>;
    updateCourse(courseId: string, updateCourseDto: UpdateCourseDto): Promise<import("./course.schema").Course>;
    addMultimedia(courseId: string, multimediaUrl: string): Promise<import("./course.schema").Course>;
}
