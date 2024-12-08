import { 
  Body, 
  Controller, 
  Post, 
  Get, 
  UseGuards, 
  Patch, 
  Param, 
  Query,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from './user.service';
import { CreateUserdto } from './dots/CreateUser.dto';
import { FailedLoginDocument } from './failed-login.schema';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectModel('FailedLogin') private readonly failedLoginModel: Model<FailedLoginDocument>,
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserdto): Promise<any> {
    try {
      return await this.userService.createUser(createUserDto);
    } catch (error) {
      console.error('Error in createUser:', error.message);
      throw error;
    }
  }

  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Query('role') role: string,
    @Body() updateData: any,
  ) {
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

  @Get(':userId/enrolled-courses')
  async getEnrolledCourses(@Param('userId') userId: string) {
    return this.userService.getEnrolledCourses(userId);
  }

  @Get(':userId/created-courses')
  async getCreatedCourses(@Param('userId') userId: string) {
    return this.userService.getCreatedCourses(userId);
  }

  @Patch(':userId/add-courses/student')
async addCoursesToStudent(
    @Param('userId') userId: string,
    @Body('courseIds') courseIds: string[],
) {
    return this.userService.addCoursesToStudent(userId, courseIds);
}


@Patch(':userId/add-courses/instructor')
async addCoursesToInstructor(
    @Param('userId') userId: string,
    @Body('courseIds') courseIds: string[],
) {
    return this.userService.addCoursesToInstructor(userId, courseIds);
}

@Get('failed-logins') // Define the specific route
    @UseGuards(RolesGuard) // Restrict access based on roles
    @Roles('admin') // Only accessible by admins
    async getFailedLogins(): Promise<any> {
        return this.failedLoginModel.find().sort({ timestamp: -1 }).exec();
    }

}
