import { Model } from 'mongoose';
import { User } from 'src/user-managment/users.schema';
import { CreateUserdto } from './dots/CreateUser.dto';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    CreateUser(CreateUserdto: CreateUserdto): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
