import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { LoginRequestDto } from './dto/login-request.dto';
import { RegistrationRequestDto } from './dto/registration-request.dto';
import { Role } from 'src/shared/enums/role.enum';
import { LoginResponseDto } from './dto/login-response.dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { ResponseMessage } from 'src/shared/decorator/response-message.decorator';
import { ApiOkWrappedResponse } from 'src/shared/decorator/swagger-response.decorator';

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
  @ApiOperation({ summary: `${Role.SUPER_ADMIN} registration` })
  @ResponseMessage('Registration successful')
  @ApiOkWrappedResponse(UserResponseDto, 'Register super admin')
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBody({ type: RegistrationRequestDto })
  async register(@Body() registrationRequest: RegistrationRequestDto) {
    return this.authService.createSuperAdminAccount(registrationRequest);
  }
}
