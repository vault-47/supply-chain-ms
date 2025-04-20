import { Injectable } from '@nestjs/common';
import { LoginRequestDto } from './dto/login-request.dto';

@Injectable()
export class AuthService {
  loginHandler(payload: LoginRequestDto): object {
    console.log(payload);
    return {
      access_token: 'TOKENNNN',
    };
  }
}
