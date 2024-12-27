import { Model } from 'mongoose';
import { Module as CourseModule, ModuleDocument } from './module.schema';
export declare class ModuleService {
    private moduleModel;
    constructor(moduleModel: Model<ModuleDocument>);
    createModule(moduleData: Partial<CourseModule>): Promise<CourseModule>;
}
