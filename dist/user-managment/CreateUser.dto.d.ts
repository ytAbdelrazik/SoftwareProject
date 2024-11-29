export declare class CreateUserdto {
    userId: string;
    name: string;
    email: string;
    passwordHash: string;
    role: 'student' | 'instructor' | 'admin';
    profilePictureUrl?: string;
    createdAt: Date;
}
