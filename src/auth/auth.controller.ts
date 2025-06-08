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
import { LoginResponseWrapperDto } from './dto/responses/login-response.dto';
import { UserResponseDto } from 'src/users/dto/response/user-response.dto';
import { ResponseMessage } from 'src/shared/decorator/response-message.decorator';
import { ApiOkWrappedResponse } from 'src/shared/decorator/swagger-response.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Grant access to all users' })
  @ResponseMessage('Login successfull')
  @ApiOkResponse({
    description: 'Login successful',
    type: LoginResponseWrapperDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBody({ type: LoginRequestDto })
  login(@Body() loginRequest: LoginRequestDto) {
    return this.authService.authenticateUser(loginRequest);
  }

  @Post('register')
  @ApiOperation({ summary: `${Role.SUPER_ADMIN} registration` })
  @ResponseMessage('Registration successful')
  @ApiOkWrappedResponse(UserResponseDto)
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBody({ type: RegistrationRequestDto })
  register(@Body() registrationRequest: RegistrationRequestDto) {
    return this.authService.createSuperAdminAccount(registrationRequest);
  }
}
