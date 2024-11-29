import { CourseService } from './course.service';
import { Course } from './course.schema';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    createCourse(courseData: Partial<Course>): Promise<Course>;
}
