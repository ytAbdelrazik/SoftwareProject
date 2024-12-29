import { ModuleService } from './module.service';
import { CreateModuleDto } from 'src/course-management/dots/create-module.dto';
export declare class ModuleController {
    private readonly moduleService;
    constructor(moduleService: ModuleService);
    createModule(req: any, moduleDto: CreateModuleDto): Promise<import("./module.schema").Module>;
    getModulesForStudents(courseId: string): Promise<import("./module.schema").Module[]>;
    getModulesOrderedByDate(order: 'asc' | 'desc', req: any): Promise<import("./module.schema").Module[]>;
    updateModule(req: any, moduleId: string, updateData: any): Promise<import("./module.schema").Module>;
}
