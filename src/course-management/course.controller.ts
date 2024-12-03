import { Controller, Post, Put, Body, Param, Patch, Get } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dots/create-course.dto';
import { UpdateCourseDto } from './dots/update-course.dto';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  
  @Get()
  async getAllCourses() {
    return this.courseService.getAllCourses();
  }
  // Create a new course
  @Post()
  async createCourse(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.createCourse(createCourseDto);
  }

  // Update an existing course
  @Put(':id')
  async updateCourse(@Param('id') courseId: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.updateCourse(courseId, updateCourseDto);
  }

  // Add a multimedia resource to a course
  @Patch(':id/multimedia')
  async addMultimedia(@Param('id') courseId: string, @Body('url') multimediaUrl: string) {
    return this.courseService.addMultimedia(courseId, multimediaUrl);
  }
}
