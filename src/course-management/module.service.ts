import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Module as CourseModule, ModuleDocument } from './module.schema';

@Injectable()
export class ModuleService {
  constructor(@InjectModel(CourseModule.name) private moduleModel: Model<ModuleDocument>) {}

  async createModule(moduleData: Partial<CourseModule>): Promise<CourseModule> {
    const newModule = new this.moduleModel(moduleData);
    return newModule.save();
  }
}
