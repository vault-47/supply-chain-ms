import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginRequestDto } from './dto/login-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ description: 'Admin login' })
  @ApiUnauthorizedResponse({ description: 'Not authorised' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBody({ type: LoginRequestDto })
  login(@Body() loginRequestDto: LoginRequestDto): object {
    return this.authService.loginHandler(loginRequestDto);
  }
}
