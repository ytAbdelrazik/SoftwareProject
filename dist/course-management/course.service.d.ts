import { Model } from 'mongoose';
import { Course, CourseDocument } from './course.schema';
import { CreateCourseDto } from './dots/create-course.dto';
import { UpdateCourseDto } from './dots/update-course.dto';
export declare class CourseService {
    private courseModel;
    constructor(courseModel: Model<CourseDocument>);
    createCourse(createCourseDto: CreateCourseDto): Promise<Course>;
    getAllCourses(): Promise<Course[]>;
    updateCourse(courseId: string, updateCourseDto: UpdateCourseDto): Promise<Course>;
    revertToVersion(courseId: string, version: string): Promise<Course>;
    getVersions(courseId: string): Promise<Array<{
        version: string;
        updatedAt: Date;
    }>>;
    addMultimedia(courseId: string, multimediaUrl: string): Promise<Course>;
}
