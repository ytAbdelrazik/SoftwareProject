import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true, enum: ['student', 'instructor', 'admin'] })
  role: 'student' | 'instructor' | 'admin';

  @Prop()
  profilePictureUrl?: string; // Optional URL of the user’s profile picture

  @Prop({ default: Date.now })
  createdAt: Date; // Timestamp of account creation
}

export const UserSchema = SchemaFactory.createForClass(User);
