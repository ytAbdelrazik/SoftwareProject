import { Controller, Post, Body } from '@nestjs/common';
import { CourseManagementService } from './course-management.service';
import { Course } from './courses.schema';
import { Module as ModuleEntity } from './modules.schema';

@Controller('course-management')
export class CourseManagementController {
  constructor(private readonly courseService: CourseManagementService) {}

  @Post('create-course')
  async createCourse(@Body() courseData: Partial<Course>) {
    return this.courseService.createCourse(courseData);
  }

  @Post('create-module')
  async createModule(@Body() moduleData: Partial<ModuleEntity>) {
    return this.courseService.createModule(moduleData);
  }
}
