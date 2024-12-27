import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user-managment/user.service';
import { CreateUserdto } from '../user-managment/dots/CreateUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FailedLoginDocument } from './failed-login.schema';

@Injectable()
export class AuthService {
  private readonly adminPassphrase = 'admin'; // Passphrase for admin
  private readonly instructorPassphrase = 'inst'; // Passphrase for instructor

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectModel('FailedLogin') private failedLoginModel: Model<FailedLoginDocument>,
  ) {}


  private async logFailedAttempt(
    email: string,
    reason: string,
    ipAddress: string,
    userAgent: string,
  ): Promise<void> {
    await this.failedLoginModel.create({
      email,
      reason,
      ipAddress,
      userAgent,
    });
  }

  
  private generateUserId(role: string): string {
    const randomNumber = Math.floor(10000 + Math.random() * 90000); // Random 5-digit number
    switch (role) {
      case 'admin':
        return `AD${randomNumber}`;
      case 'instructor':
        return `IS${randomNumber}`;
      case 'student':
        return `ST${randomNumber}`;
      default:
        throw new BadRequestException('Invalid role');
    }
  }



  async signUp(userDto: CreateUserdto): Promise<any> {
    // Check for role-specific passphrase
    if (userDto.role === 'admin' && userDto.passphrase !== this.adminPassphrase) {
      throw new UnauthorizedException('Invalid passphrase for admin role');
    }
    if (userDto.role === 'instructor' && userDto.passphrase !== this.instructorPassphrase) {
      throw new UnauthorizedException('Invalid passphrase for instructor role');
    }

    // Generate a unique user ID based on the role
    const userId = this.generateUserId(userDto.role);

    // Hash the password
    const hashedPassword = await bcrypt.hash(userDto.password, 10);

    // Create the new user
    const newUser = {
      userId,
      name: userDto.name,
      email: userDto.email,
      passwordHash: hashedPassword,
      role: userDto.role,
     
    };

    return this.userService.createUser(newUser); // Save the user in the database
  }


  async validateUser(email: string, password: string, ipAddress?: string, userAgent?: string): Promise<any> {
    const user = await this.userService.findByEmail(email); 
    
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      if (ipAddress && userAgent) {
        // Log the failed login attempt if IP and user agent are provided
        await this.logFailedAttempt(email, 'Invalid credentials', ipAddress, userAgent);
      }
      return null;
    }
  
    // Exclude the passwordHash field from the result
    const { passwordHash, ...result } = user;
    
    return result; // Return the user object without the passwordHash field
  }
  


  
  async login(email: string, password: string, ipAddress: string, userAgent: string): Promise<any> {
    const user = await this.validateUser(email, password, ipAddress, userAgent);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, role: user.role, sub: user.userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
