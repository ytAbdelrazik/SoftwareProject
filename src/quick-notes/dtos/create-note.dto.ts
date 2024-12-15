import { IsString, IsOptional } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  title: string;

  @IsString()
  userId: string;

  @IsOptional()  // optional because not every note may be linked to a course
  @IsString()
  courseId?: string;

  @IsString()
  content: string;
}
