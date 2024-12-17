import { Controller, Post, Body } from '@nestjs/common';
import { ModuleService } from './module.service';
import { Module as CourseModule } from './module.schema';

@Controller('modules')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Post('create')
  async createModule(@Body() moduleData: Partial<CourseModule>) {
    return this.moduleService.createModule(moduleData);
  }
}
