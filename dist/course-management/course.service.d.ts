import { Model } from 'mongoose';
import { Course, CourseDocument } from './course.schema';
import { CreateCourseDto } from './dots/create-course.dto';
import { UpdateCourseDto } from './dots/update-course.dto';
import { StudentDocument } from './student.schema';
import { InstructorDocument } from './instructor.schema';
import { AddMultimediaDto } from './dots/add-multimedia.dto';
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
    addMultimedia(courseId: string, multimediaDto: AddMultimediaDto): Promise<Course>;
    removeMultimedia(courseId: string, multimediaId: string): Promise<Course>;
    getMultimedia(courseId: string): Promise<Array<{
        resourceType: string;
        url: string;
        title: string;
    }>>;
    searchCourses(query: string, limit?: number, skip?: number): Promise<Course[]>;
    searchStudents(query: string, limit?: number, skip?: number): Promise<any[]>;
    searchInstructors(query: string, limit?: number, skip?: number): Promise<any[]>;
}
