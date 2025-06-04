import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { InviteUserRequestDto } from './dto/invite-user-request.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Role } from 'src/shared/enums/role.enum';
import { UserAcceptInviteRequestDto } from './dto/accept-invite-request.dto';
import { Roles } from 'src/shared/decorator/role.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Post('invitations')
  @ApiOperation({
    summary: 'Super admin send invite to admins, shippers and vendors',
  })
  @ApiOkResponse({ description: 'Successfully sent invitation' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiBearerAuth('bearer')
  @ApiBody({ type: InviteUserRequestDto })
  async invite(@Body() inviteUserRequestDto: InviteUserRequestDto) {
    return this.usersService.inviteCustomer(inviteUserRequestDto);
  }

  @Post('invitations/:invite_code/accept')
  @ApiParam({
    name: 'invite_code',
    required: true,
    description: 'invite code',
    schema: { type: 'string' },
  })
  @ApiOperation({
    summary: 'User i.e admins, shippers and vendors complete onboarding',
  })
  @ApiOkResponse({ description: 'Successfully accepted invitation' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiBody({ type: UserAcceptInviteRequestDto })
  async accept_invite(
    @Param('invite_code') invite_code: string,
    @Body()
    userAcceptInviteRequestDto: UserAcceptInviteRequestDto,
  ) {
    return this.usersService.createUserAccount(
      invite_code,
      userAcceptInviteRequestDto,
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Get('invitations')
  @ApiOperation({
    summary: `Returns list of invites. Accessible only by ${Role.SUPER_ADMIN} and ${Role.ADMIN}`,
  })
  @ApiResponse({})
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiBearerAuth('bearer')
  async invites() {
    return this.usersService.invites();
  }
}
