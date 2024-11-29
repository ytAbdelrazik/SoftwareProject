import { UserService } from 'src/user-managment/user-service';
import { CreateUserdto } from './dots/CreateUser.dto';
export declare class UserController {
    private userservice;
    constructor(userservice: UserService);
    CreateUser(CreateUserdto: CreateUserdto): void;
}
