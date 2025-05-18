import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginRequestDto } from './dto/login-request.dto';
import { RegistrationRequestDto } from './dto/registration-request.dto';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthenticatedRequest } from 'src/shared/interfaces/authenticated-request.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Grant access to all users' })
  @ApiOkResponse({ description: 'Login successfull' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBody({ type: LoginRequestDto })
  login(@Body() loginRequestDto: LoginRequestDto): object {
    return this.authService.authenticateUser(loginRequestDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'User registration' })
  @ApiOkResponse({ description: 'Registration successfull' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBody({ type: RegistrationRequestDto })
  register(@Body() registrationRequestDto: RegistrationRequestDto) {
    return this.authService.createUserAccount(registrationRequestDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Current user profile' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiOkResponse({ description: 'This user profile' })
  @ApiBearerAuth('bearer')
  profile(@Request() request: AuthenticatedRequest) {
    const data = request?.user;
    return this.usersService.findProfileById(data.uid);
  }
}
