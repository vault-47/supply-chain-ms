import { Controller, Get, Query, UseGuards } from '@nestjs/common';
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
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiBearerAuth('bearer')
  async invites(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('role') role: Role,
  ) {
    return this.usersService.getAllUsers({ page, pageSize, role });
  }
}
