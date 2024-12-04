import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InstructorDocument = Instructor & Document;

@Schema()
export class Instructor {
  @Prop({ required: true, unique: true })
  id: string; // Unique identifier for the instructor

  @Prop({ required: true })
  name: string; // Full name of the instructor

  @Prop({ required: true, unique: true })
  email: string; // Email address of the instructor

  @Prop({ required: true })
  expertise: string[]; // List of expertise areas (e.g., "Computer Science", "Mathematics")

  @Prop({ required: true })
  coursesCreated: string[]; // List of course IDs created by the instructor

  @Prop({ default: Date.now })
  createdAt: Date; // Timestamp when the instructor was created
}

export const InstructorSchema = SchemaFactory.createForClass(Instructor);
