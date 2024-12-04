import { Model } from 'mongoose';
import { Course, CourseDocument } from './course.schema';
import { CreateCourseDto } from './dots/create-course.dto';
import { UpdateCourseDto } from './dots/update-course.dto';
import { StudentDocument } from './student.schema';
import { InstructorDocument } from './instructor.schema';
export declare class CourseService {
    private courseModel;
    private studentModel;
    private instructorModel;
    constructor(courseModel: Model<CourseDocument>, studentModel: Model<StudentDocument>, instructorModel: Model<InstructorDocument>);
    createCourse(createCourseDto: CreateCourseDto): Promise<Course>;
    getAllCourses(): Promise<Course[]>;
    updateCourse(courseId: string, updateCourseDto: UpdateCourseDto): Promise<Course>;
    revertToVersion(courseId: string, version: string): Promise<Course>;
    getVersions(courseId: string): Promise<Array<{
        version: string;
        updatedAt: Date;
    }>>;
    addMultimedia(courseId: string, multimediaUrl: string): Promise<Course>;
    searchCourses(query: string): Promise<Course[]>;
    searchStudents(query: string): Promise<any[]>;
    searchInstructors(query: string): Promise<any[]>;
}
