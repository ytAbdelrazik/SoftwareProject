import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  courseId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsEnum(['Beginner', 'Intermediate', 'Advanced'])
  difficultyLevel: string;

  @IsString()
  @IsNotEmpty()
  createdBy: string;
}