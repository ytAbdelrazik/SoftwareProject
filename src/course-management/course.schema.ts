import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class Course {

    @Prop({ required: true, unique: true })
    courseId: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    category: string;

    @Prop({ required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] })
    difficultyLevel: 'Beginner' | 'Intermediate' | 'Advanced';

    @Prop({ required: true })
    createdBy: string;

    @Prop({ required: true, default: Date.now })
    createdAt: Date;

    @Prop({ type: [String], default: [] })
    multimedia: string[]; 

    @Prop({ type: Array, default: [] })
  versions: Array<{
    version: string;
    content: Record<string, any>; // Snapshot of the course state
    updatedAt: Date;
  }>;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
