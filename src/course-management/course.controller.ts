import { Controller, Post, Get, Delete, Body, Param, Query, Patch } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dots/create-course.dto';
import { UpdateCourseDto } from './dots/update-course.dto';
import { AddMultimediaDto } from './dots/add-multimedia.dto';
import { UserService } from 'src/user-managment/user.service';
import { NotFoundException } from '@nestjs/common';
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService,
  private readonly UserService : UserService

  ) {}
  @Post()
  async createCourse(
    @Body('insID') insID: string, // Extract instructor ID from the body
    @Body() createCourseDto: CreateCourseDto, // Extract the rest of the body as CreateCourseDto
  ) {
    if (!insID) {
      throw new NotFoundException('Instructor ID is required');
    }
  
    // Check if the instructor ID is valid
    const isadmin = await  this.UserService.getUserById(insID);
 
    if (!(isadmin.role==='instructor')) {
      throw new NotFoundException('Invalid instructor ID'); // Throw error if the ID is invalid
    }
    const isCourseExist =await this.courseService.courseExists(createCourseDto.courseId);
    if (isCourseExist) {
      throw new NotFoundException('Course ID already exists'); // Prevent creating duplicate course IDs
    }


    const course=this.courseService.createCourse(createCourseDto, insID); 
    await this.updateInstructorCourses((await course).courseId,insID);
    return;
  }
  


  @Get(':courseId')
  async getCourseById(@Param('courseId') courseId: string) {
    try {
      const course = await this.courseService.getCourseById(courseId); // Call the service method

      // Return the course if found
      return course;
    } catch (error) {
     throw(error)
    }
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

  @Patch(':courseId/instructor/:instructorId')
  async updateInstructorCourses(
    @Param('courseId') courseId: string,
    @Param('instructorId') instructorId: string,
  ): Promise<void> {
    try {
      
      await this.courseService.updateINS(courseId, instructorId);
    } catch (error) {
      throw new Error(`Error updating instructor's courses: ${error.message}`);
    }
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
