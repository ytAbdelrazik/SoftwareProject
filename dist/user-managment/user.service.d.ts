import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    createUser(user: Partial<User>): Promise<User>;
    findByEmail(email: string): Promise<UserDocument>;
}
