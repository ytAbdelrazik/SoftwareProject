import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Course } from './course.schema';
import { User } from 'src/user-managment/users.schema';
export type StudentDocument = Student & Document;

@Schema()
export class Student extends User {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, default: [] })
  enrolledCourses: Course[];

  @Prop({ default: Date.now })
  createdAt: Date;
  
  @Prop({ default: [] })
  completedCourses: string[];

  @Prop({ default: 0 })
  gpa: number;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
