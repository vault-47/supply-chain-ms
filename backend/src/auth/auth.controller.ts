import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { LoginRequestDto } from './dto/login-request.dto';
import { RegistrationRequestDto } from './dto/registration-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { ResponseMessage } from 'src/shared/decorator/response-message.decorator';
import { ApiOkWrappedResponse } from 'src/shared/decorator/swagger-response.decorator';
import { VerifyAccountRequestDto } from './dto/verify-account-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Grant access to all users' })
  @ResponseMessage('Login successfull')
  @ApiOkWrappedResponse(LoginResponseDto, 'Login successful')
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBody({ type: LoginRequestDto })
  async login(@Body() loginRequest: LoginRequestDto) {
    return this.authService.authenticateUser(loginRequest);
  }

  @Post('register')
  @ApiOperation({ summary: 'User registration' })
  @ResponseMessage('Registration successful')
  @ApiOkWrappedResponse(UserResponseDto, 'Register user')
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBody({ type: RegistrationRequestDto })
  async register(@Body() registrationRequest: RegistrationRequestDto) {
    return this.authService.register(registrationRequest);
  }

  @Post('register/verify')
  @ApiOperation({ summary: 'Veriy account after registration' })
  @ResponseMessage('Verification successful')
  @ApiOkWrappedResponse(UserResponseDto, 'Verify user')
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBody({ type: VerifyAccountRequestDto })
  async verifyAccount(@Body() verifyAccountRequest: VerifyAccountRequestDto) {
    return this.authService.verifyAccount(verifyAccountRequest);
  }
}
