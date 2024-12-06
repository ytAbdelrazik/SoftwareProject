export declare class CreateUserdto {
    password(password: any, arg1: number): void;
    userId: string;
    name: string;
    email: string;
    passwordHash: string;
    role: 'student' | 'instructor' | 'admin';
    profilePictureUrl?: string;
    createdAt: Date;
    passphrase: string;
}
