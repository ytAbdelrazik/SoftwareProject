import { IsString, IsArray, IsNumber, IsDate, IsNotEmpty } from 'class-validator';

export class SubmitResponseDto {
  @IsString()
  @IsNotEmpty()
  responseId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  quizId: string;

  @IsArray()
  @IsNotEmpty({ each: true })
  answers: object[];

  @IsNumber()
  @IsNotEmpty()
  score: number;

  @IsDate()
  @IsNotEmpty()
  submittedAt: Date;
}
