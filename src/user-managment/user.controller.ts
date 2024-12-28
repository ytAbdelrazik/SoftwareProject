import { 
  Body, 
  Controller, 
  Post, 
  Get, 
  UseGuards, 
  Patch, 
  Param, 
  Query,
  UnauthorizedException,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from './user.service';
import { CreateUserdto } from './dots/CreateUser.dto';
import { FailedLoginDocument } from './failed-login.schema';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { Course } from 'src/course-management/course.schema';
import { Instructor } from 'src/course-management/instructor.schema';
import { Student } from 'src/course-management/student.schema';
import * as bcrypt from 'bcrypt';
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectModel('FailedLogin') private readonly failedLoginModel: Model<FailedLoginDocument>,
    @InjectModel('Course') private readonly courseModel: Model<Course>, // Inject the Course model
  ) {}



  @Get('getUser/byId')
  async getUserById(@Query('userId') userId: string) {
      const user = await this.userService.getUserById(userId);
      return user;
  }
  



  @Patch('profile')
  @UseGuards(RolesGuard) // Ensure the user is authenticated
  async updateProfile(@Req() req, @Body() updateData: any) {
    const userId = req.user.userId; // Extract userId from the logged-in user's JWT
    const role = req.user.role; // Extract role from the logged-in user's JWT
  
    // Only allow instructors and students to update their profiles
    if (role !== 'student' && role !== 'instructor') {
      throw new UnauthorizedException('Only students and instructors can update their profiles');
    }
  
    // If the password field is included, hash the new password
    if (updateData.password) {
      updateData.passwordHash = await bcrypt.hash(updateData.password, 10); // Hash the new password
      delete updateData.password; // Remove the plain password from the updateData object
    }
  
    return this.userService.updateUser(userId, role, updateData);
  }

  @Get('students')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async getAllStudents() {
    return this.userService.getAllByRole('student');
  }

  @Get('instructors')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async getAllInstructors() {
    return this.userService.getAllByRole('instructor');
  }



  @Get(':userId/created-courses')
  async getCreatedCourses(@Param('userId') userId: string) {
    const user = await this.userService.getUserById(userId);
    
    // Check if the user is an Instructor and return createdCourses
    if (user instanceof Instructor) {
      return user.createdCourses; // Ensure this is an array of Course objects
    }

    throw new Error('User is not an instructor');
  }

  @Get('search')
  @UseGuards(RolesGuard)
  @Roles('instructor') // Restrict to instructors
  async searchStudents(
    @Query('name') name: string,
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
  ) {
    if (!name) {
      throw new NotFoundException('Name parameter is required for search');
    }
    const students = await this.userService.searchStudentsByName(name, limit, offset);
    if (!students || students.length === 0) {
      throw new NotFoundException(`No students found for name: "${name}"`);
    }
    return students;
  }




  
  @Get('failed-logins') 
  @UseGuards(RolesGuard)
  @Roles('admin')
  async getFailedLogins(): Promise<any> {
    return this.failedLoginModel.find().sort({ timestamp: -1 }).exec();
  }
  

  
}
