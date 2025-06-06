import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    const token = authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException(
        'Unauthorized request. Please provide access token',
      );
    }

    try {
      const token_payload = await this.authService.validateToken(token);
      const profile_data = await this.userService.findProfileById(
        token_payload.sub,
      );
      const user = {
        uid: token_payload.sub,
        email: token_payload.email,
        role: profile_data.role,
      };
      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException(
        error || 'session expired! Please sign In',
      );
    }
  }
}
