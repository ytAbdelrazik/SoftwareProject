import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(['student', 'instructor', 'admin'])
  @IsNotEmpty()
  role: 'student' | 'instructor' | 'admin';

  @IsOptional()
  @IsString()
  profilePictureUrl?: string;

  @IsOptional() // Only required for admin/instructor
  @IsString()
  passphrase?: string;
}
