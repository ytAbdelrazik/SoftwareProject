import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProgressDto {
  @IsNotEmpty()
  @IsString()
  progressId: string;

  @IsNotEmpty()
  @IsNumber()
  completionPercentage: number;

  @IsNotEmpty()
  lastAccessed: Date;
}
