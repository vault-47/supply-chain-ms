import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/shared/enums/role.enum';
import { Roles } from 'src/shared/decorator/role.decorator';
import { ResponseMessage } from 'src/shared/decorator/response-message.decorator';
import { WorkspacesService } from './workspaces.service';
import { AuthenticatedRequest } from 'src/shared/interfaces/authenticated-request.interface';
import { PaginatedResponseDto } from 'src/pagination/dto/pagination.dto';
import { GetWorkspaceMembersParamDto } from './dto/get-workspace-members-param-dto';
import { CreateWorkspaceBodyDto } from './dto/create-workspace-body.dto';
import { GetWorkspaceParamDto } from './dto/get-workspace-param-dto';
import { WorkSpaceMemberResponseDto } from './dto/workspace-member-response.dto';
import { ApiOkWrappedResponse } from 'src/shared/decorator/swagger-response.decorator';
import { BaseResponseDto } from 'src/shared/dto/base-response.dto';
import { WorkspaceResponseDto } from './dto/workspace-response-dto';
import { DeleteWorkspaceMemberParamDto } from './dto/delete-workspace-member-paraam-dto';
import { InviteWorkspaceMemberBodyDto } from './dto/invite-workspace-member-body.dto';

@Controller('workspaces')
@ApiTags('Workspaces ⏸️(ON HOLD)')
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.SHIPPER, Role.VENDOR)
export class WorkspacesController {
  constructor(private readonly workspaceService: WorkspacesService) {}

  @Post()
  @ApiOperation({ summary: 'Create workspace. Accessible only by customers' })
  @ResponseMessage('Workspace created successfully')
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiExtraModels(BaseResponseDto, WorkspaceResponseDto)
  @ResponseMessage('Workspace created successfully')
  @ApiOkWrappedResponse(WorkspaceResponseDto)
  @ApiBody({ type: CreateWorkspaceBodyDto })
  @ApiBearerAuth('bearer')
  async createWorkspace(
    @Request() request: AuthenticatedRequest,
    @Body() body: CreateWorkspaceBodyDto,
  ) {
    const data = request?.user;
    return this.workspaceService.createWorkspace({
      owner_user_uid: data.uid,
      body,
    });
  }

  @Post('/invite')
  @ApiOperation({
    summary:
      'Invite workspace member. Accessible only by customer(workspace owner)',
  })
  @ResponseMessage('Workspace member invited successfully')
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiExtraModels(BaseResponseDto, WorkspaceResponseDto)
  @ResponseMessage('Workspace created successfully')
  @ApiOkWrappedResponse(WorkspaceResponseDto)
  @ApiBody({ type: InviteWorkspaceMemberBodyDto })
  @ApiBearerAuth('bearer')
  async inviteWorkspaceMember(
    @Request() request: AuthenticatedRequest,
    @Body() body: InviteWorkspaceMemberBodyDto,
  ) {
    const current_user = request?.user;
    return this.workspaceService.inviteWorkspaceMember({
      invited_by: current_user.uid,
      body,
    });
  }

  @Get()
  @ApiOperation({
    summary: "List current user's workspaces. Accessible only by customers",
  })
  @ApiExtraModels(BaseResponseDto, WorkspaceResponseDto)
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ResponseMessage('Workspaces fetched successfully')
  @ApiOkResponse({
    description: "Current user's workspaces",
    schema: {
      allOf: [
        {
          properties: {
            status: {
              type: 'boolean',
            },
            message: {
              type: 'string',
            },
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(WorkspaceResponseDto) },
            },
          },
        },
      ],
    },
  })
  @ApiBearerAuth('bearer')
  async fetchWorkspaces(@Request() request: AuthenticatedRequest) {
    const data = request?.user;
    return this.workspaceService.fetchCurrentUserWorkspaces(data.uid);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get workspace. Accessible only by customers',
  })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ResponseMessage('Fetched workspace')
  @ApiExtraModels(BaseResponseDto, WorkspaceResponseDto)
  @ApiOkWrappedResponse(WorkspaceResponseDto)
  @ApiBearerAuth('bearer')
  async getWorkspaceDetail(
    @Param() params: GetWorkspaceParamDto,
    @Request() request: AuthenticatedRequest,
  ) {
    const data = request?.user;
    return this.workspaceService.getWorkspaceDetail({
      workspace_uid: params.id,
      user_uid: data.uid,
    });
  }

  @Put('/:id')
  @ApiOperation({
    summary:
      'Update workspace name created by current user. Accessible only by customers',
  })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ResponseMessage('Workspace name updated')
  @ApiExtraModels(BaseResponseDto, WorkspaceResponseDto)
  @ApiOkWrappedResponse(WorkspaceResponseDto)
  @ApiBody({ type: CreateWorkspaceBodyDto })
  @ApiBearerAuth('bearer')
  async updateWorkspaceName(
    @Param() params: GetWorkspaceParamDto,
    @Request() request: AuthenticatedRequest,
    @Body() body: CreateWorkspaceBodyDto,
  ) {
    const data = request?.user;
    return this.workspaceService.updateWorkspace({
      workspace_uid: params.id,
      profile_uid: data.uid,
      body,
    });
  }

  @ApiExtraModels(PaginatedResponseDto, WorkSpaceMemberResponseDto)
  @Get('/:id/members')
  @ApiOperation({
    summary: `Returns list of current user's workspace members`,
  })
  @ApiOkResponse({
    description: 'Paginated workspace members',
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(PaginatedResponseDto),
        },
        {
          properties: {
            status: {
              type: 'boolean',
            },
            message: {
              type: 'string',
            },
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(WorkSpaceMemberResponseDto) },
            },
          },
        },
      ],
    },
  })
  @ResponseMessage('Members list')
  @ApiQuery({ name: 'page', required: false, type: Number, default: 1 })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, default: 10 })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiBearerAuth('bearer')
  async getWorkspaceMembers(
    @Param() params: GetWorkspaceMembersParamDto,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.workspaceService.getWorkspaceMembers({
      workspace_uid: params.id,
      page,
      pageSize,
    });
  }

  @Delete('/:workspace_id/members/:user_id')
  @ApiOperation({
    summary: `Remove workspace member`,
  })
  @ApiOkResponse({
    description: 'Member removed',
  })
  @ResponseMessage('Member removed')
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiBearerAuth('bearer')
  async removeWorkspaceMember(@Param() params: DeleteWorkspaceMemberParamDto) {
    return this.workspaceService.removeWorkspaceMember({
      workspace_uid: params.workspace_uid,
      user_uid: params.user_uid,
    });
  }
}
