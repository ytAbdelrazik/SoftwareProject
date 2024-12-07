import { AuthService } from './auth.service';
import { CreateUserdto } from '../user-managment/dots/CreateUser.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(createUserDto: CreateUserdto): Promise<any>;
    login(body: any, req: any): Promise<any>;
}
