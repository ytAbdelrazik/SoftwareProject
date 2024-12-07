import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    const hashedPassword = await this.authService.hashPassword(body.password);
    return {
      message: 'User registered successfully',
      username: body.username,
      hashedPassword,
    };
  }

  @Post('login')
  async login(@Body() body: { password: string; hashedPassword: string }) {
    const mockUser = { userId: '123', username: 'testuser', role: 'student' }; // Replace with database lookup

    const isValid = await this.authService.validatePassword(
      body.password,
      body.hashedPassword,
    );

    if (!isValid) {
      return { message: 'Invalid credentials' };
    }

    const token = this.authService.generateJwt(mockUser.userId, mockUser.role);
    return { message: 'Login successful', token };
  }
}
