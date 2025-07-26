import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { AuthenticatedRequest } from 'src/shared/interfaces/authenticated-request.interface';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ResponseMessage } from 'src/shared/decorator/response-message.decorator';
import { ApiOkWrappedResponse } from 'src/shared/decorator/swagger-response.decorator';
import { BaseResponseDto } from 'src/shared/dto/base-response.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiExtraModels(BaseResponseDto, UserResponseDto)
  @ApiOperation({ summary: 'Current user profile' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ResponseMessage('Profile fetched successfully')
  @ApiOkWrappedResponse(UserResponseDto)
  @ApiBearerAuth('bearer')
  async profile(@Request() request: AuthenticatedRequest) {
    const data = request?.user;
    return this.usersService.getUser(data.uid);
  }
}
