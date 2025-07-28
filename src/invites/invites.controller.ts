import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { InvitesService } from './invites.service';
import { InviteUserRequestDto } from './dto/invite-user-request.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Role } from 'src/shared/enums/role.enum';
import { AcceptInviteRequestDto } from './dto/accept-invite-request.dto';
import { Roles } from 'src/shared/decorator/role.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { InvitationResponseDto } from './dto/invitation-response.dto';
import { UsersService } from 'src/users/users.service';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { ResponseMessage } from 'src/shared/decorator/response-message.decorator';
import { InviteUserResponseDto } from './dto/invite-user-response.dto';
import {
  ApiOkWrappedPaginatedResponse,
  ApiOkWrappedResponse,
} from 'src/shared/decorator/swagger-response.decorator';
import { PaginatedResponseDto } from 'src/pagination/dto/pagination.dto';

@Controller('invites')
export class InvitesController {
  constructor(
    private readonly invitesService: InvitesService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Post()
  @ApiOperation({
    summary: `Admins send invite to ${Role.ADMIN}, ${Role.SHIPPER} and ${Role.VENDOR}`,
  })
  @ApiOkWrappedResponse(InviteUserResponseDto, 'User invite sent successfully')
  @ResponseMessage('Invitation has been sent to admin')
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiBearerAuth('bearer')
  @ApiBody({ type: InviteUserRequestDto })
  async invite(@Body() inviteUserRequest: InviteUserRequestDto) {
    return this.invitesService.inviteUser(inviteUserRequest);
  }

  @Post('/:invite_code/accept')
  @ApiParam({
    name: 'invite_code',
    required: true,
    description: 'invite code',
    schema: { type: 'string' },
  })
  @ApiOperation({
    summary: 'User i.e admins, shippers and vendors complete onboarding',
  })
  @ApiOkWrappedResponse(UserResponseDto, 'Successfully accepted invitation')
  @ResponseMessage('Invitation accepted')
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiBody({ type: AcceptInviteRequestDto })
  async accept_invite(
    @Param('invite_code') invite_code: string,
    @Body()
    userAcceptInviteRequest: AcceptInviteRequestDto,
  ) {
    return this.usersService.createUserAccount(
      invite_code,
      userAcceptInviteRequest,
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Get()
  @ApiOperation({
    summary: `Returns list of invites. Accessible only by ${Role.SUPER_ADMIN} and ${Role.ADMIN}`,
  })
  @ResponseMessage('List of invites')
  @ApiOkWrappedPaginatedResponse(InvitationResponseDto, 'Invitation list')
  @ApiQuery({ name: 'page', required: false, type: Number, default: 1 })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, default: 10 })
  @ApiQuery({
    name: 'role',
    required: false,
    type: String,
    enum: [Role.ADMIN, Role.VENDOR, Role.SHIPPER, Role.DISPATCHER],
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiBearerAuth('bearer')
  async invites(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('role') role: Role,
  ) {
    return this.invitesService.invites({ page, pageSize, role });
  }
}
