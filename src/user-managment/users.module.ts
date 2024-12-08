import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RolesGuard } from './roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { StudentSchema } from '../course-management/student.schema';
import { InstructorSchema } from '../course-management/instructor.schema';
import { UserSchema } from './users.schema';
import { FailedLoginSchema } from './failed-login.schema';
import { Reflector } from '@nestjs/core'; // Required for metadata reflection in guards

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Student', schema: StudentSchema },      // Register Student schema
      { name: 'Instructor', schema: InstructorSchema }, // Register Instructor schema
      { name: 'Admin', schema: UserSchema },            // Register Admin schema (as User)
      { name: 'FailedLogin', schema: FailedLoginSchema }, // Register FailedLogin schema
    ]),
    JwtModule.register({
      secret: 'ahmed', // Replace with your secure secret key
      signOptions: { expiresIn: '1h' }, // Token expiration
    }),
  ],
  controllers: [UserController], // Add user-related endpoints
  providers: [
    UserService,  // User service for handling business logic
    RolesGuard,   // Guard for role-based access control
    Reflector,    // Reflector for metadata access in guards
  ],
  exports: [
    UserService, // Export UserService for use in other modules
    JwtModule,   // Export JwtModule for shared JWT functionality
  ],
})
export class UsersModule {}
