export declare class CreateUserdto {
    name: string;
    email: string;
    password: string;
    role: 'student' | 'instructor' | 'admin';
    passphrase?: string;
}
