import { IsOptional, IsString, IsArray, IsEnum } from 'class-validator';

export class UpdateCourseDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  multimedia?: string[];

  @IsString()
  @IsOptional()
  @IsEnum(['Beginner', 'Intermediate', 'Advanced'])
  difficultyLevel: string;
}
