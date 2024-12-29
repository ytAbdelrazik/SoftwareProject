import { Model } from 'mongoose';
import { Module, ModuleDocument } from './module.schema';
import { Course } from '../course-management/course.schema';
import { Instructor } from './instructor.schema';
import { CreateModuleDto } from 'src/course-management/dots/create-module.dto';
export declare class ModuleService {
    private readonly moduleModel;
    private readonly courseModel;
    private readonly instructorModel;
    constructor(moduleModel: Model<ModuleDocument>, courseModel: Model<Course>, instructorModel: Model<Instructor>);
    private validateInstructorForCourse;
    createModule(userId: string, moduleDto: CreateModuleDto): Promise<Module>;
    getModulesByCourse(courseId: string): Promise<Module[]>;
    updateModule(userId: string, moduleId: string, updateData: any): Promise<Module>;
    getModulesOrderedByDate(order: 'asc' | 'desc'): Promise<Module[]>;
    getModulesForStudents(courseId: string): Promise<Module[]>;
}
