import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ResponseDocument = Response & Document;

@Schema({ timestamps: true })
export class Response {
  @Prop({ required: true })
  quizId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({
    type: [
      {
        questionId: String,
        answer: String,
      },
    ],
    required: true,
  })
  answers: { questionId: string; answer: string }[];
}

export const ResponseSchema = SchemaFactory.createForClass(Response);
