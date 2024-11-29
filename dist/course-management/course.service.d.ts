import { Model } from 'mongoose';
import { Course, CourseDocument } from './course.schema';
export declare class CourseService {
    private courseModel;
    constructor(courseModel: Model<CourseDocument>);
    createCourse(courseData: Partial<Course>): Promise<Course>;
}
