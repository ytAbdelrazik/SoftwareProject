import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your_jwt_secret', // Replace with an environment variable in production
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController], // Ensure the controller is included here
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
