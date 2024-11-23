import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './courses.schema';
import { Module as ModuleEntity, ModuleSchema } from './modules.schema';
import { CourseManagementService } from './course-management.service';
import { CourseManagementController } from './course-management.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: ModuleEntity.name, schema: ModuleSchema },
    ]),
  ],
  controllers: [CourseManagementController],
  providers: [CourseManagementService],
})
export class CourseManagementModule {}
