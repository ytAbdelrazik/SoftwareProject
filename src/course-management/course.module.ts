import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CourseSchema } from './course.schema';
import { StudentSchema } from './student.schema'; // Add this line
import { InstructorSchema } from './instructor.schema'; // Add this line

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Course', schema: CourseSchema },
      { name: 'Student', schema: StudentSchema }, // Register the Student schema
      { name: 'Instructor', schema: InstructorSchema }, // Register the Instructor schema
    ]),
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
