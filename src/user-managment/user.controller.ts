import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
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

  /**
   * Endpoint to create a new user.
   * @param createUserDto - The data transfer object for creating a user.
   * @returns The created user document.
   */
  @Post()
  async createUser(@Body() createUserDto: CreateUserdto): Promise<any> {
    try {
      return await this.userService.createUser(createUserDto);
    } catch (error) {
      throw error; // Handle exceptions like duplicate user or invalid role.
    }
  }

  /**
   * Endpoint to get all failed login attempts.
   * Restricted to admins only.
   * @returns A list of failed login attempts.
   */
  @Get('failed-logins')
  @UseGuards(RolesGuard)
  @Roles('admin') // Only accessible by admins.
  async getFailedLogins(): Promise<any> {
    return this.failedLoginModel.find().sort({ timestamp: -1 }).exec();
  }

  /**
   * Endpoint to get all students.
   * Restricted to admins only.
   * @returns A list of all students.
   */
  @Get('students')
  @UseGuards(RolesGuard)
  @Roles('admin') // Only accessible by admins.
  async getAllStudents(): Promise<any> {
    return this.userService.getAllByRole('student');
  }

  /**
   * Endpoint to get all instructors.
   * Restricted to admins only.
   * @returns A list of all instructors.
   */
  @Get('instructors')
  @UseGuards(RolesGuard)
  @Roles('admin') // Only accessible by admins.
  async getAllInstructors(): Promise<any> {
    return this.userService.getAllByRole('instructor');
  }
}
