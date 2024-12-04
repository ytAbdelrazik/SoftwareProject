import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({ required: true, unique: true })
  courseId: string; // Unique identifier for the course

  @Prop({ required: true, index: true })
  title: string; // Title of the course (Indexed for faster text searches)

  @Prop({ required: true })
  description: string; // Brief description of the course

  @Prop({ required: true, index: true })
  category: string; // Course category (e.g., Math, CS) (Indexed for filtering)

  @Prop({ required: true })
  difficultyLevel: 'Beginner' | 'Intermediate' | 'Advanced'; // Difficulty level of the course

  @Prop({ required: true, index: true })
  createdBy: string; // ID or name of the instructor who created the course (Indexed for instructor-based queries)

  @Prop({ required: true, default: Date.now })
  createdAt: Date; // Timestamp of course creation

  @Prop({ type: [String], default: [] })
  multimedia: string[]; // Array of multimedia resource URLs (e.g., videos, PDFs)

  @Prop({ type: Array, default: [] })
  versions: Array<{
    version: string; // Version identifier (e.g., v1, v2)
    content: Record<string, any>; // Snapshot of the course state
    updatedAt: Date; // Timestamp when this version was created
  }>;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

// Add indexes to optimize queries
CourseSchema.index({ title: 'text', category: 'text', createdBy: 'text' }); // Text index for searching
CourseSchema.index({ category: 1 }); // Single field index for filtering by category
