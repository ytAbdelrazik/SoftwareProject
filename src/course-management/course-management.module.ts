import { Module } from '@nestjs/common';
import { CourseManagementController } from './course-management.controller';
import { CourseManagementService } from './course-management.service';
import { DiscussionsModule } from './discussions/discussions.module'; // Import DiscussionsModule
import { CourseModule } from './course.module'; // Import CourseModule

@Module({
  imports: [
    DiscussionsModule, // Register DiscussionsModule for discussion functionalities
    CourseModule, // Register CourseModule for course functionalities
  ],
  controllers: [CourseManagementController],
  providers: [CourseManagementService],
})
export class CourseManagementModule {}
