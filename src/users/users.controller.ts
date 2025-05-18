import {
  Body,
  Controller,
  ForbiddenException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { InviteUserRequestDto } from './dto/invite-user-request.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AuthenticatedRequest } from 'src/shared/interfaces/authenticated-request.interface';
import { Role } from 'src/shared/enums/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Post('invitations')
  @ApiOperation({
    summary: 'Super admin send invite to admins, shippers and vendors',
  })
  @ApiOkResponse({ description: 'Successfully sent invitation' })
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiBearerAuth('bearer')
  @ApiBody({ type: InviteUserRequestDto })
  async invite(
    @Request() request: AuthenticatedRequest,
    @Body() inviteUserRequestDto: InviteUserRequestDto,
  ) {
    const currentUser = await this.usersService.findProfileById(
      request.user.uid,
    );
    if (![Role.ADMIN, Role.SUPER_ADMIN].includes(currentUser.role)) {
      throw new ForbiddenException(
        'You are not allowed to perform this action',
      );
    }
    return this.usersService.inviteCustomer(inviteUserRequestDto);
  }
}
