import { IsAlpha, IsNotEmpty, IsString } from "class-validator";

export class CreateUserdto{
    password(password: any, arg1: number) {
        throw new Error('Method not implemented.');
    }
   @IsNotEmpty()
   @IsString()
    userId: string;
    name: string;
    email:string;
    passwordHash: string;
    role: 'student' | 'instructor' | 'admin';
    profilePictureUrl?: string; // Optional URL of the user’s profile picture
    createdAt: Date; // Timestamp of account creation
    passphrase: string;
  }
