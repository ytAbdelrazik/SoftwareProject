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

  @Prop({ required: true })
  difficultyLevel: 'Beginner' | 'Intermediate' | 'Advanced';

  @Prop({ required: true })
  createdBy: string;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop({
    type: [
      {
        resourceType: { type: String, enum: ['video', 'pdf', 'image'], required: true },
        url: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    default: [],
  })
  multimedia: Array<{
    [x: string]: any;
    resourceType: 'video' | 'pdf' | 'image';
    url: string;
    title: string;
    description?: string;
    uploadedAt: Date;
  }>;

  @Prop({
    type: [
      {
        version: { type: String, required: true },
        content: { type: Object, required: true },
        updatedAt: { type: Date, default: Date.now },
      },
    ],
    default: [],
  })
  versions: Array<{
    version: string;
    content: Record<string, any>;
    updatedAt: Date;
    uploadedAt?: Date; // Optional field
  }>;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

// Add indexes to optimize queries
CourseSchema.index({ title: 'text', category: 'text', createdBy: 'text' }); // Text index for searching
CourseSchema.index({ category: 1 }); // Single field index for filtering by category
