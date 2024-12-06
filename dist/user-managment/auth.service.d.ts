import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user-managment/user.service';
import { CreateUserdto } from './CreateUser.dto';
export declare class AuthService {
    private userService;
    private jwtService;
    private readonly adminPassphrase;
    private readonly instructorPassphrase;
    constructor(userService: UserService, jwtService: JwtService);
    private generateUserId;
    signUp(userDto: CreateUserdto): Promise<any>;
    validateUser(email: string, password: string): Promise<any>;
    login(email: string, password: string): Promise<any>;
}
