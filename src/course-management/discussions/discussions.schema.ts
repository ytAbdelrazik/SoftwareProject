import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Discussion extends Document {
  @Prop({ required: true }) // The course ID this discussion belongs to
  courseId: string;

  @Prop({ required: true }) // ID of the user who created the discussion
  userId: string;

  @Prop({ required: true, enum: ['student', 'instructor'] }) // Role of the user
  role: string;

  @Prop({ required: true }) // Discussion content
  content: string;

  @Prop({ default: Date.now }) // Timestamp of creation
  createdAt: Date;
}

export const DiscussionSchema = SchemaFactory.createForClass(Discussion);