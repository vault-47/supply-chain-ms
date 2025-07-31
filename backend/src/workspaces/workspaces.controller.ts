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
  HttpCode,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiNoContentResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/shared/enums/role.enum';
import { Roles } from 'src/shared/decorator/role.decorator';
import { ResponseMessage } from 'src/shared/decorator/response-message.decorator';
import { WorkspacesService } from './workspaces.service';
import { AuthenticatedRequest } from 'src/shared/interfaces/authenticated-request.interface';
import { GetWorkspaceMembersParamDto } from './dto/get-workspace-members-param-dto';
import { CreateWorkspaceBodyDto } from './dto/create-workspace-body.dto';
import { GetWorkspaceParamDto } from './dto/get-workspace-param-dto';
import { WorkSpaceMemberResponseDto } from './dto/workspace-member-response.dto';
import {
  ApiOkWrappedPaginatedResponse,
  ApiOkWrappedResponse,
} from 'src/shared/decorator/swagger-response.decorator';
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
  @ResponseMessage('Workspace created successfully')
  @ApiOkWrappedResponse(WorkspaceResponseDto, 'Workspace creation successful')
  @ApiBody({ type: CreateWorkspaceBodyDto })
  @ApiBearerAuth('bearer')
  async createWorkspace(
    @Request() request: AuthenticatedRequest,
    @Body() body: CreateWorkspaceBodyDto,
  ) {
    const data = request?.user;
    return this.workspaceService.createWorkspace({
      owner_user_id: data.id,
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
  @ResponseMessage('Workspace created successfully')
  @ApiOkWrappedResponse(
    WorkspaceResponseDto,
    'Workspace member invite successful',
  )
  @ApiBody({ type: InviteWorkspaceMemberBodyDto })
  @ApiBearerAuth('bearer')
  async inviteWorkspaceMember(
    @Request() request: AuthenticatedRequest,
    @Body() body: InviteWorkspaceMemberBodyDto,
  ) {
    const current_user = request?.user;
    return this.workspaceService.inviteWorkspaceMember({
      invited_by: current_user.id,
      body,
    });
  }

  @Get()
  @ApiOperation({
    summary: "List current user's workspaces. Accessible only by customers",
  })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ResponseMessage('Workspaces fetched successfully')
  @ApiOkWrappedResponse(WorkspaceResponseDto, "Current user's workspaces")
  @ApiBearerAuth('bearer')
  async fetchWorkspaces(@Request() request: AuthenticatedRequest) {
    const data = request?.user;
    return this.workspaceService.fetchCurrentUserWorkspaces(data.id);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get workspace. Accessible only by customers',
  })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ResponseMessage('Fetched workspace')
  @ApiOkWrappedResponse(WorkspaceResponseDto, 'Workspace detail')
  @ApiBearerAuth('bearer')
  async getWorkspaceDetail(
    @Param() params: GetWorkspaceParamDto,
    @Request() request: AuthenticatedRequest,
  ) {
    const data = request?.user;
    return this.workspaceService.getWorkspaceDetail({
      workspace_id: params.id,
      user_id: data.id,
    });
  }

  @Put('/:id')
  @ApiOperation({
    summary:
      'Update workspace name created by current user. Accessible only by customers',
  })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ResponseMessage('Workspace name updated')
  @ApiOkWrappedResponse(WorkspaceResponseDto, 'Workspace updated successfully')
  @ApiBody({ type: CreateWorkspaceBodyDto })
  @ApiBearerAuth('bearer')
  async updateWorkspaceName(
    @Param() params: GetWorkspaceParamDto,
    @Request() request: AuthenticatedRequest,
    @Body() body: CreateWorkspaceBodyDto,
  ) {
    const data = request?.user;
    return this.workspaceService.updateWorkspace({
      workspace_id: params.id,
      profile_id: data.id,
      body,
    });
  }

  @Get('/:id/members')
  @ApiOperation({
    summary: `Returns list of current user's workspace members`,
  })
  @ApiOkWrappedPaginatedResponse(
    WorkSpaceMemberResponseDto,
    'Paginated workspace members',
  )
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
      workspace_id: params.id,
      page,
      pageSize,
    });
  }

  @Delete('/:workspace_id/members/:user_id')
  @ApiOperation({
    summary: `Remove workspace member`,
  })
  @HttpCode(204)
  @ApiNoContentResponse({
    description: 'Workspace member removed successfully',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiBearerAuth('bearer')
  @ApiParam({
    name: 'workspace_id',
    required: true,
    description: 'Workspace ID',
  })
  @ApiParam({
    name: 'user_id',
    required: true,
    description: 'User ID to remove',
  })
  async removeWorkspaceMember(@Param() params: DeleteWorkspaceMemberParamDto) {
    return this.workspaceService.removeWorkspaceMember({
      workspace_id: params.workspace_id,
      user_id: params.user_id,
    });
  }
}
