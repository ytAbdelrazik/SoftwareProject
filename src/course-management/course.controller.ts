import { Controller, Post, Put, Body, Param, Patch, Get, BadRequestException, Query } from '@nestjs/common';
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


  // Update a course with versioning
  @Put(':id')
  async updateCourse(@Param('id') courseId: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.updateCourse(courseId, updateCourseDto);
  }

  // Revert to a specific version
  @Post(':id/revert')
  async revertToVersion(@Param('id') courseId: string, @Body('version') version: string) {
    return this.courseService.revertToVersion(courseId, version);
  }
  

  /**
   * Search for courses by title, category, or instructor.
   * @param {string} query - The search query string.
   * @returns {Promise<any[]>} - The list of matching courses.
   */
  @Get('search')
  async searchCourses(@Query('q') query: string) {
    if (!query) {
      throw new Error('Search query cannot be empty.');
    }
    return this.courseService.searchCourses(query);
  }

  /**
   * Search for students by name, email, or ID.
   * @param {string} query - The search query string.
   * @returns {Promise<any[]>} - The list of matching students.
   */
  @Get('students/search')
  async searchStudents(@Query('q') query: string) {
    if (!query) {
      throw new Error('Search query cannot be empty.');
    }
    return this.courseService.searchStudents(query);
  }

  /**
   * Search for instructors by name, email, or ID.
   * @param {string} query - The search query string.
   * @returns {Promise<any[]>} - The list of matching instructors.
   */
  @Get('instructors/search')
  async searchInstructors(@Query('q') query: string) {
    if (!query) {
      throw new Error('Search query cannot be empty.');
    }
    return this.courseService.searchInstructors(query);
  }
  

  // Get all versions of a course
  @Get(':id/versions')
  async getVersions(@Param('id') courseId: string) {
    return this.courseService.getVersions(courseId);
  }

  // Add a multimedia resource to a course
  @Patch(':id/multimedia')
  async addMultimedia(@Param('id') courseId: string, @Body('url') multimediaUrl: string) {
    return this.courseService.addMultimedia(courseId, multimediaUrl);
  }
}
