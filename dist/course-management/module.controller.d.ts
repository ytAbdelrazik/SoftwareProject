import { ModuleService } from './module.service';
import { Module as CourseModule } from './module.schema';
export declare class ModuleController {
    private readonly moduleService;
    constructor(moduleService: ModuleService);
    createModule(moduleData: Partial<CourseModule>): Promise<CourseModule>;
}
