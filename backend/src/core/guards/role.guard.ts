import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requestedRole = this.reflector.get(Roles, context.getHandler());

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) throw new UnauthorizedException();
    if (!requestedRole) return true;

    try {
      const payload = this.jwtService.verify(token);
      request.user = payload;

      if (requestedRole === payload.role) return true;
      else return false;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
