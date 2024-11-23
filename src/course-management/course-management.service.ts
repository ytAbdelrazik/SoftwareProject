import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './courses.schema';
import { Module as ModuleEntity, ModuleDocument } from './modules.schema';

@Injectable()
export class CourseManagementService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    @InjectModel(ModuleEntity.name) private moduleModel: Model<ModuleDocument>,
  ) {}

  // Example method: Create a course
  async createCourse(courseData: Partial<Course>): Promise<Course> {
    const createdCourse = new this.courseModel(courseData);
    return createdCourse.save();
  }

  // Example method: Create a module
  async createModule(moduleData: Partial<ModuleEntity>): Promise<ModuleEntity> {
    const createdModule = new this.moduleModel(moduleData);
    return createdModule.save();
  }
}
