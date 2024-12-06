import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(userDto: any): Promise<any>;
    login({ email, password }: {
        email: string;
        password: string;
    }): Promise<any>;
}
