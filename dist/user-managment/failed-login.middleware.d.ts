import { NestMiddleware } from '@nestjs/common';
export declare class FailedLoginMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void): void;
}
