import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    const token = authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Please provide token');
    }

    try {
      const token_payload = await this.authService.validateToken(token);
      const user = {
        uid: token_payload.sub,
        email: token_payload.email,
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
