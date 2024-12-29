import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (request.route.path === '/auth/login' ||request.route.path === '/auth/sign-up' ) {
      return true; // Allow login without token
    }
    if (!authorization) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const token = authorization.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Bearer token missing');
    }

    try {
      const user = this.jwtService.verify(token); // Decode token
      if (!user.userId || !user.role) {
        throw new UnauthorizedException('Invalid token payload');
      }
      request.user = user; // Attach the user to the request
      return requiredRoles ? requiredRoles.includes(user.role) : true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
    
  }
}
