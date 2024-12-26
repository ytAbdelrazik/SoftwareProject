import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Notification extends Document {
  @Prop({ required: true }) // ID of the recipient (student/instructor)
  recipientId: string;

  @Prop({ required: true }) // Notification message
  message: string;

  @Prop({ required: true, enum: ['reply', 'announcement', 'new_message'] }) // Type of notification
  type: string;

  @Prop({ default: false }) // Whether the notification has been read
  isRead: boolean;

  @Prop({ default: Date.now }) // Timestamp of notification
  createdAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
