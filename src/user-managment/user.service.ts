import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
    @InjectModel('Admin') private readonly adminModel: Model<User>,
  ) {}

  /**
   * Get the appropriate Mongoose model based on the user's role.
   * @param role - The role of the user (e.g., student, instructor, admin).
   * @returns The Mongoose model for the specified role.
   */
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

  /**
   * Generate a unique user ID based on the user's role.
   * @param role - The user's role (e.g., student, instructor, admin).
   * @returns A unique user ID.
   */
  private generateUserId(role: string): string {
    const randomNumber = Math.floor(10000 + Math.random() * 90000); // Generate a random 5-digit number.
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

  /**
   * Create a new user in the appropriate collection.
   * @param userData - The data for the user to be created.
   * @returns The created user document.
   */
  async createUser(userData: any): Promise<User> {
    const model = this.getModelByRole(userData.role);

    // Check for duplicate email
    const existingUser = await model.findOne({ email: userData.email }).exec();
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Generate and assign a unique userId
    userData.userId = this.generateUserId(userData.role);

    try {
      return await model.create(userData);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user');
    }
  }

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
  async findById(userId: string, role: string): Promise<User | null> {
    const model = this.getModelByRole(role);
    const user = await model.findOne({ userId }).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

    /**
   * Get all users by role.
   * @param role - The role of the users to fetch (e.g., student, instructor).
   * @returns A list of users for the specified role.
   */
    async getAllByRole(role: string): Promise<User[]> {
      const model = this.getModelByRole(role);
      return model.find().exec();
    }
  
}
