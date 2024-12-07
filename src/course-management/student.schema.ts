import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema()
export class Student {
  @Prop({ required: true, unique: true })
  userId: string; // Auto-generated unique identifier for the student (e.g., STXXXXX)

  @Prop({ required: true })
  name: string; // Full name of the student

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true, unique: true })
  email: string; // Email address of the student

  @Prop({ required: true, default: [] })
  enrolledCourses: string[]; // List of course IDs the student is enrolled in

  @Prop({ default: Date.now })
  createdAt: Date; // Timestamp when the student was created
}

export const StudentSchema = SchemaFactory.createForClass(Student);
