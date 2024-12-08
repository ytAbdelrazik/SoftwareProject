import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { Course, CourseSchema } from './course.schema';
import { StudentSchema } from './student.schema'; // Import StudentSchema
import { InstructorSchema } from './instructor.schema'; // Import InstructorSchema

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Course', schema: CourseSchema },
      { name: 'Student', schema: StudentSchema, collection: 'students' }, // Register Student schema
      { name: 'Instructor', schema: InstructorSchema, collection: 'instructors' }, // Register Instructor schema
    ]),
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [MongooseModule], // Export MongooseModule for reuse in other modules
})
export class CourseModule {}
