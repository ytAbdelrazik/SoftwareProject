import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema()
export class Student {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, default: [] })
  enrolledCourses: string[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
