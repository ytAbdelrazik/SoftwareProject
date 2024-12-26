import { Controller, Post, Get, Delete, Body, Param, Query, Patch, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dots/create-course.dto';
import { UpdateCourseDto } from './dots/update-course.dto';
import { AddMultimediaDto } from './dots/add-multimedia.dto';
import { UserService } from 'src/user-managment/user.service';
import { NotFoundException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from 'src/user-managment/roles.guard';
import { Roles } from 'src/user-managment/roles.decorator';
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
  @UseGuards(RolesGuard)
  @Roles('instructor') // Restrict to instructors only
  async addMultimedia(
    @Param('courseId') courseId: string, 
    @Body() multimediaDto: AddMultimediaDto
  ) {
    return this.courseService.addMultimedia(courseId, multimediaDto);
  }
  
  @Delete(':courseId/multimedia/:multimediaId')
  @UseGuards(RolesGuard)
  @Roles('instructor') // Restrict to instructors only
  async removeMultimedia(
    @Param('courseId') courseId: string, 
    @Param('multimediaId') multimediaId: string
  ) {
    return this.courseService.removeMultimedia(courseId, multimediaId);
  }

  @Get(':courseId/multimedia')
  @UseGuards(RolesGuard)
  @Roles('instructor') // Restrict to instructors only
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
  
  /**
   * Get all enrolled courses for the logged-in student.
   * @param req - The request object containing JWT user details.
   * @returns List of enrolled courses for the student.
   */
  @Get('students/enrolled-courses')
  @UseGuards(RolesGuard) // Ensure authentication and role validation
  async getAllEnrolledCourses(@Req() req) {
    const userId = req.user.userId; // Extract userId from JWT
    const role = req.user.role;

    if (role !== 'student') {
      throw new UnauthorizedException('Only students can view enrolled courses');
    }

    return this.courseService.getAllEnrolledCourses(userId);
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
  
  @Get('students/:studentId/enrolled-courses')
  @UseGuards(RolesGuard)
  @Roles('instructor') // Only instructors can access this endpoint
  async getStudentEnrolledCourses(
    @Param('studentId') studentId: string,
  ) {
    return this.courseService.getStudentEnrolledCourses(studentId);
  }
  
  
}
