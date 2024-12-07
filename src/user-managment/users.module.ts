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

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Student', schema: StudentSchema },
      { name: 'Instructor', schema: InstructorSchema },
      { name: 'Admin', schema: UserSchema },
      { name: 'FailedLogin', schema: FailedLoginSchema },
    ]),
    JwtModule.register({
      secret: 'ahmed', // Replace with your secret key
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, RolesGuard], // Ensure RolesGuard is provided
  exports: [UserService, JwtModule], // Export JwtModule for use in other modules
})
export class UsersModule {}
