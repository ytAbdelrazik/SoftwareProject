import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from '../course-management/student.schema';
import { Instructor } from '../course-management/instructor.schema';
import { User } from './users.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('Student') private readonly studentModel: Model<Student>,
    @InjectModel('Instructor') private readonly instructorModel: Model<Instructor>,
    @InjectModel('Admin') private readonly adminModel: Model<User>, // Correctly references 'Admin' model
  ) {}

  private getModelByRole(role: string): Model<any> {
    switch (role) {
      case 'student':
        return this.studentModel;
      case 'instructor':
        return this.instructorModel;
      case 'admin':
        return this.adminModel;
      default:
        throw new NotFoundException(`Invalid role: ${role}`);
    }
  }

  private generateUserId(role: string): string {
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    switch (role) {
      case 'student':
        return `ST${randomNumber}`;
      case 'instructor':
        return `IS${randomNumber}`;
      case 'admin':
        return `AD${randomNumber}`;
      default:
        throw new Error('Invalid role');
    }
  }

  async createUser(userData: any): Promise<any> {
    const model = this.getModelByRole(userData.role);

    // Validate email uniqueness
    const existingUser = await model.findOne({ email: userData.email }).exec();
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Generate a unique userId
    let uniqueUserId = '';
    let isUnique = false;
    while (!isUnique) {
      uniqueUserId = this.generateUserId(userData.role);
      const userIdCheck = await model.findOne({ userId: uniqueUserId }).exec();
      isUnique = !userIdCheck;
    }
    userData.userId = uniqueUserId;

    try {
      return await model.create(userData);
    } catch (error) {
      console.error('Error creating user:', error);

      if (error.code === 11000) {
        throw new ConflictException('Duplicate key error: User already exists');
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async updateUser(userId: string, role: string, updateData: any): Promise<any> {
    const model = this.getModelByRole(role);
    const user = await model.findOne({ userId }).exec();

    if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Exclude userId from being updated
    if ('userId' in updateData) {
        delete updateData.userId;
    }

    if (updateData.email) {
        // Check for duplicate email
        const existingUser = await model.findOne({
            email: updateData.email,
            userId: { $ne: userId }, // Exclude the current user from duplicate check
        }).exec();

        if (existingUser) {
            throw new ConflictException('Email is already in use');
        }
    }

    // Update allowed fields
    Object.assign(user, updateData);
    return user.save();
}



  async getAllByRole(role: string): Promise<any[]> {
    const model = this.getModelByRole(role);
    return model.find().exec();
  }

  async getEnrolledCourses(userId: string): Promise<any[]> {
    const student = await this.studentModel.findOne({ userId }).exec();
    if (!student) {
      throw new NotFoundException(`Student with ID ${userId} not found`);
    }
    return student.enrolledCourses;
  }

  async getCreatedCourses(userId: string): Promise<any[]> {
    const instructor = await this.instructorModel.findOne({ userId }).exec();
    if (!instructor) {
      throw new NotFoundException(`Instructor with ID ${userId} not found`);
    }
    return instructor.coursesCreated;
  }

  




  /**
   * Find a user by email.
   * @param email - The email to search for.
   * @returns The user document, if found.
   */
  async findByEmail(email: string): Promise<any | null> {
    const student = await this.studentModel.findOne({ email }).exec();
    if (student) return student;

    const instructor = await this.instructorModel.findOne({ email }).exec();
    if (instructor) return instructor;

    const admin = await this.adminModel.findOne({ email }).exec();
    return admin;
  }

  /**
   * Find a user by their ID and role.
   * @param userId - The ID of the user to find.
   * @param role - The role of the user (e.g., student, instructor, admin).
   * @returns The user document, if found.
   */
  async findById(userId: string, role: string): Promise<any | null> {
    const model = this.getModelByRole(role);
    const user = await model.findOne({ userId }).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }





  async addCoursesToStudent(userId: string, courseIds: string[]): Promise<any> {
    const student = await this.studentModel.findOne({ userId }).exec();

    if (!student) {
        throw new NotFoundException(`Student with ID ${userId} not found`);
    }

    student.enrolledCourses = Array.from(new Set([...student.enrolledCourses, ...courseIds])); // Avoid duplicates
    return student.save();
}



async addCoursesToInstructor(userId: string, courseIds: string[]): Promise<any> {
  const instructor = await this.instructorModel.findOne({ userId }).exec();

  if (!instructor) {
      throw new NotFoundException(`Instructor with ID ${userId} not found`);
  }

  instructor.coursesCreated = Array.from(new Set([...instructor.coursesCreated, ...courseIds])); // Avoid duplicates
  return instructor.save();
}

}
