import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { LoginRequestDto } from './dto/requests/login-request.dto';
import { RegistrationRequestDto } from './dto/requests/registration-request.dto';
import { Role } from 'src/shared/enums/role.enum';
import { LoginResponseDto } from './dto/responses/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Grant access to all users' })
  @ApiOkResponse({
    description: 'Login successfull',
    type: LoginResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBody({ type: LoginRequestDto })
  login(@Body() loginRequestDto: LoginRequestDto): object {
    return this.authService.authenticateUser(loginRequestDto);
  }

  @Post('register')
  @ApiOperation({ summary: `${Role.SUPER_ADMIN} registration` })
  @ApiOkResponse({ description: 'Registration successfull' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBody({ type: RegistrationRequestDto })
  register(@Body() registrationRequestDto: RegistrationRequestDto) {
    return this.authService.createSuperAdminAccount(registrationRequestDto);
  }
}
