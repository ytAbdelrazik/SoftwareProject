import { Module } from '@nestjs/common';
import { CourseManagementController } from './course-management.controller';
import { CourseManagementService } from './course-management.service';

@Module({
  controllers: [CourseManagementController],
  providers: [CourseManagementService]
})
export class CourseManagementModule {}
