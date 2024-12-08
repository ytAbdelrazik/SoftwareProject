import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InstructorDocument = Instructor & Document;

@Schema()
export class Instructor {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  expertise: string[];

  @Prop({ required: true, default: [] })
  coursesCreated: string[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const InstructorSchema = SchemaFactory.createForClass(Instructor);
