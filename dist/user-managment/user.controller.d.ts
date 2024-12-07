import { Model } from 'mongoose';
import { UserService } from './user.service';
import { CreateUserdto } from './dots/CreateUser.dto';
import { FailedLoginDocument } from './failed-login.schema';
export declare class UserController {
    private readonly userService;
    private readonly failedLoginModel;
    constructor(userService: UserService, failedLoginModel: Model<FailedLoginDocument>);
    createUser(createUserDto: CreateUserdto): Promise<any>;
    getFailedLogins(): Promise<any>;
    getAllStudents(): Promise<any>;
    getAllInstructors(): Promise<any>;
}
