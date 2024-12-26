import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuizDocument = Quiz & Document;

@Schema({ timestamps: { createdAt: 'createdAt' } })
export class Quiz {
  @Prop({ required: true, unique: true })
  quizId: string;

  @Prop({ required: true })
  moduleId: string;

  @Prop({
    type: [{ question: String, options: [String], answer: String }],
    required: true,
  })
  questions: { question: string; options: string[]; answer: string }[];
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
