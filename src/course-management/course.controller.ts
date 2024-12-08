import { Controller, Post, Get, Delete, Body, Param, Query } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dots/create-course.dto';
import { UpdateCourseDto } from './dots/update-course.dto';
import { AddMultimediaDto } from './dots/add-multimedia.dto';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async createCourse(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.createCourse(createCourseDto);
  }
  

  @Get()
  async getAllCourses() {
    return this.courseService.getAllCourses();
  }

  @Post(':courseId')
  async updateCourse(@Param('courseId') courseId: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.updateCourse(courseId, updateCourseDto);
  }

  @Post(':courseId/revert')
  async revertToVersion(@Param('courseId') courseId: string, @Query('version') version: string) {
    return this.courseService.revertToVersion(courseId, version);
  }

  @Get(':courseId/versions')
  async getVersions(@Param('courseId') courseId: string) {
    return this.courseService.getVersions(courseId);
  }

  @Post(':courseId/multimedia')
  async addMultimedia(@Param('courseId') courseId: string, @Body() multimediaDto: AddMultimediaDto) {
    return this.courseService.addMultimedia(courseId, multimediaDto);
  }

  @Delete(':courseId/multimedia/:multimediaId')
  async removeMultimedia(@Param('courseId') courseId: string, @Param('multimediaId') multimediaId: string) {
    return this.courseService.removeMultimedia(courseId, multimediaId);
  }

  @Get(':courseId/multimedia')
  async getMultimedia(@Param('courseId') courseId: string) {
    return this.courseService.getMultimedia(courseId);
  }

  @Get('search')
  async searchCourses(
    @Query('q') query: string,
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
  ) {
    return this.courseService.searchCourses(query, limit, offset);
  }
  
  @Get('students/search')
  async searchStudents(
    @Query('q') query: string,
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
  ) {
    return this.courseService.searchStudents(query, limit, offset);
  }
  
  @Get('instructors/search')
  async searchInstructors(
    @Query('q') query: string,
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
  ) {
    return this.courseService.searchInstructors(query, limit, offset);
  }
  
}
