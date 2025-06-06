import {
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Role } from 'src/shared/enums/role.enum';
import { Roles } from 'src/shared/decorator/role.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { PaginatedResponseDto } from 'src/pagination/dto/pagination.dto';
import { UserResponseDto } from './dto/response/user-response.dto';
import { AccountStatus } from 'src/shared/enums/account-status.enum';
import { AuthenticatedRequest } from 'src/shared/interfaces/authenticated-request.interface';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiExtraModels(PaginatedResponseDto, UserResponseDto)
  @Get()
  @ApiOperation({
    summary: `Returns list of users. Accessible only by ${Role.SUPER_ADMIN} and ${Role.ADMIN}`,
  })
  @ApiOkResponse({
    description: 'Paginated users',
    schema: {
      allOf: [
        { $ref: getSchemaPath(PaginatedResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(UserResponseDto) },
            },
          },
        },
      ],
    },
  })
  @ApiQuery({ name: 'page', required: false, type: Number, default: 1 })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, default: 10 })
  @ApiQuery({ name: 'role', required: false, type: String, enum: Role })
  @ApiQuery({
    name: 'status',
    required: false,
    type: String,
    enum: AccountStatus,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiBearerAuth('bearer')
  async getUsers(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('role') role: Role,
    @Query('status') status: AccountStatus,
  ) {
    return this.usersService.getAllUsers({ page, pageSize, role, status });
  }

  @Get('/:id')
  @ApiOperation({
    summary: `Returns specific user. Accessible only by ${Role.SUPER_ADMIN} and ${Role.ADMIN}`,
  })
  @ApiOkResponse({
    description: 'Get user',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiBearerAuth('bearer')
  async getUser(@Param('id') id: string) {
    return this.usersService.findProfileById(id);
  }

  @Post('/:id/suspend')
  @ApiOperation({
    summary: `Suspend user account. Accessible only by ${Role.SUPER_ADMIN} and ${Role.ADMIN}`,
  })
  @ApiOkResponse({
    description: 'Suspend user account',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiBearerAuth('bearer')
  async suspendUser(@Param('id') id: string) {
    const profile = await this.usersService.findProfileById(id);
    if (profile.role === Role.SUPER_ADMIN) {
      throw new ForbiddenException(`Cannot modify ${Role.SUPER_ADMIN} account`);
    }
    return this.usersService.suspendUserAccount(id);
  }

  @Post('/:id/activate')
  @ApiOperation({
    summary: `Activate user account. Accessible only by ${Role.SUPER_ADMIN} and ${Role.ADMIN}`,
  })
  @ApiOkResponse({
    description: 'Activate user account',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiBearerAuth('bearer')
  async activateUser(@Param('id') id: string) {
    const profile = await this.usersService.findProfileById(id);
    if (profile.role === Role.SUPER_ADMIN) {
      throw new ForbiddenException(`Cannot modify ${Role.SUPER_ADMIN} account`);
    }
    return this.usersService.activateUserAccount(id);
  }
}
