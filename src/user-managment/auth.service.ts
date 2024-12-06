import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user-managment/user.service';
import { CreateUserdto } from './CreateUser.dto';

@Injectable()
export class AuthService {
  private readonly adminPassphrase = 'admin'; // Passphrase for admin
  private readonly instructorPassphrase = 'inst'; // Passphrase for instructor

  constructor(private userService: UserService, private jwtService: JwtService) {}

  /**
   * Generates a unique user ID based on role.
   * @param role - The user's role (admin, student, instructor).
   * @returns Generated user ID.
   */
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

  /**
   * Sign up a new user.
   * @param userDto - The user data transfer object.
   * @returns Newly created user.
   */
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
      profilePictureUrl: userDto.profilePictureUrl || null,
    };

    return this.userService.createUser(newUser); // Save the user in the database
  }

  /**
   * Validate a user during login.
   * @param email - User's email.
   * @param password - User's password.
   * @returns User data without passwordHash if valid.
   */
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      const { passwordHash, ...result } = user.toObject();
      return result; // Exclude passwordHash in the response
    }
    return null;
  }

  /**
   * Log in a user and generate a JWT.
   * @param email - User's email.
   * @param password - User's password.
   * @returns JWT access token.
   */
  async login(email: string, password: string): Promise<any> {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, role: user.role, sub: user.userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
