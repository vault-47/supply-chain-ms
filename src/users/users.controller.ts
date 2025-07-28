import {
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Role } from 'src/shared/enums/role.enum';
import { Roles } from 'src/shared/decorator/role.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { UserResponseDto } from './dto/user-response.dto';
import { AccountStatus } from 'src/shared/enums/account-status.enum';
import {
  ApiOkWrappedPaginatedResponse,
  ApiOkWrappedResponse,
} from 'src/shared/decorator/swagger-response.decorator';
import { ResponseMessage } from 'src/shared/decorator/response-message.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Get()
  @ApiOperation({
    summary: `Returns list of users. Accessible only by ${Role.SUPER_ADMIN} and ${Role.ADMIN}`,
  })
  @ApiOkWrappedPaginatedResponse(UserResponseDto, 'Paginated users')
  @ResponseMessage('Users list')
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
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: `Returns specific user. Accessible by any logged in user`,
  })
  @ResponseMessage('User information fetched')
  @ApiOkWrappedResponse(UserResponseDto, 'Get user account')
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiBearerAuth('bearer')
  async getUser(@Param('id') id: string) {
    return await this.usersService.getUser(id);
  }

  @Post('/:id/suspend')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({
    summary: `Suspend user account. Accessible only by ${Role.SUPER_ADMIN} and ${Role.ADMIN}`,
  })
  @ApiOkWrappedResponse(UserResponseDto, 'Suspend user account')
  @ResponseMessage('User has been suspended')
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiBearerAuth('bearer')
  async suspendUser(@Param('id') id: string) {
    const user_data = await this.usersService.getUser(id);
    if (user_data.role === Role.SUPER_ADMIN) {
      throw new ForbiddenException(`Cannot modify ${Role.SUPER_ADMIN} account`);
    }
    return this.usersService.suspendUserAccount(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Post('/:id/activate')
  @ApiOperation({
    summary: `Activate user account. Accessible only by ${Role.SUPER_ADMIN} and ${Role.ADMIN}`,
  })
  @ApiOkWrappedResponse(UserResponseDto, 'Activate user account')
  @ResponseMessage('User has been activated')
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiBearerAuth('bearer')
  async activateUser(@Param('id') id: string) {
    const user_data = await this.usersService.getUser(id);
    if (user_data.role === Role.SUPER_ADMIN) {
      throw new ForbiddenException(`Cannot modify ${Role.SUPER_ADMIN} account`);
    }
    return this.usersService.activateUserAccount(id);
  }
}
