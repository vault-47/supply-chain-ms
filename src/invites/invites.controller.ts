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
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { InvitesService } from './invites.service';
import { InviteUserRequestDto } from './dto/requests/invite-user-request.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Role } from 'src/shared/enums/role.enum';
import { UserAcceptInviteRequestDto } from './dto/requests/accept-invite-request.dto';
import { Roles } from 'src/shared/decorator/role.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { PaginatedResponseDto } from 'src/pagination/dto/pagination.dto';
import { InvitationResponseDto } from './dto/response/invitation-response.dto';
import { UsersService } from 'src/users/users.service';

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
  @ApiOkResponse({ description: 'Successfully sent invitation' })
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
  @ApiOkResponse({ description: 'Successfully accepted invitation' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiBody({ type: UserAcceptInviteRequestDto })
  async accept_invite(
    @Param('invite_code') invite_code: string,
    @Body()
    userAcceptInviteRequest: UserAcceptInviteRequestDto,
  ) {
    return this.usersService.createUserAccount(
      invite_code,
      userAcceptInviteRequest,
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiExtraModels(PaginatedResponseDto, InvitationResponseDto)
  @Get()
  @ApiOperation({
    summary: `Returns list of invites. Accessible only by ${Role.SUPER_ADMIN} and ${Role.ADMIN}`,
  })
  @ApiOkResponse({
    description: 'Paginated invites',
    schema: {
      allOf: [
        { $ref: getSchemaPath(PaginatedResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(InvitationResponseDto) },
            },
          },
        },
      ],
    },
  })
  @ApiQuery({ name: 'page', required: false, type: Number, default: 1 })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, default: 10 })
  @ApiQuery({ name: 'role', required: false, type: String, enum: Role })
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
