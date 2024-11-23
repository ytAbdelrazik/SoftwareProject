import { IsAlpha, IsNotEmpty, IsString } from "class-validator";

export class CreateUserdto{
   @IsNotEmpty()
   @IsString()
    userId: string;
    name: string;
    email:string;
    passwordHash: string;
    role: 'student' | 'instructor' | 'admin';
    profilePictureUrl?: string; // Optional URL of the user’s profile picture
    createdAt: Date; // Timestamp of account creation
  }
