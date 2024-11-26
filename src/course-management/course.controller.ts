import { Controller, Post, Body } from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from './course.schema';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('create')
  async createCourse(@Body() courseData: Partial<Course>) {
    return this.courseService.createCourse(courseData);
  }
}
