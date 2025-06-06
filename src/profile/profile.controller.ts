import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { AuthenticatedRequest } from 'src/shared/interfaces/authenticated-request.interface';
import { UserResponseDto } from 'src/users/dto/response/user-response.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Current user profile' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiOkResponse({
    description: 'Current user profile',
    type: UserResponseDto,
  })
  @ApiBearerAuth('bearer')
  profile(@Request() request: AuthenticatedRequest) {
    const data = request?.user;
    return this.usersService.findProfileById(data.uid);
  }
}
