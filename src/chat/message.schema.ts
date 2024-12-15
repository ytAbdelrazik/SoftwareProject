import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({ required: true })
  courseId: string; // The course where the message was sent

  @Prop({ required: true })
  senderId: string; // ID of the sender (student or instructor)

  @Prop({ required: true })
  content: string; // The actual message content

  @Prop({ default: Date.now })
  timestamp: Date; // Timestamp when the message was sent

  @Prop({ required: true })
  role: 'student' | 'instructor'; // Role of the sender (student or instructor)
}

export const MessageSchema = SchemaFactory.createForClass(Message);
