export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    role: 'student' | 'instructor' | 'admin';
    profilePictureUrl?: string;
    passphrase?: string;
}
