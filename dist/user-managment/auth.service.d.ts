import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user-managment/user.service';
import { CreateUserdto } from '../user-managment/dots/CreateUser.dto';
import { Model } from 'mongoose';
import { FailedLoginDocument } from './failed-login.schema';
export declare class AuthService {
    private userService;
    private jwtService;
    private failedLoginModel;
    private readonly adminPassphrase;
    private readonly instructorPassphrase;
    constructor(userService: UserService, jwtService: JwtService, failedLoginModel: Model<FailedLoginDocument>);
    private logFailedAttempt;
    private generateUserId;
    signUp(userDto: CreateUserdto): Promise<any>;
    validateUser(email: string, password: string, ipAddress?: string, userAgent?: string): Promise<any>;
    login(email: string, password: string, ipAddress: string, userAgent: string): Promise<any>;
}
