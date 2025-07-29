import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { db } from 'src/database/connect';
import {
  profile_info,
  users,
  workspace_members,
  workspaces,
} from 'src/database/schema';
import { desc, eq, getTableColumns, count, and } from 'drizzle-orm';
import { PaginatedResponseDto } from 'src/pagination/dto/pagination.dto';
import { PaginationService } from 'src/pagination/pagination.service';
import { CreateWorkspaceBodyDto } from './dto/create-workspace-body.dto';
import { WorkSpaceMemberResponseDto } from './dto/workspace-member-response.dto';
import { WorkspaceResponseDto } from './dto/workspace-response-dto';
import { InviteWorkspaceMemberBodyDto } from './dto/invite-workspace-member-body.dto';

@Injectable()
export class WorkspacesService {
  constructor(private readonly paginationService: PaginationService) {}

  async createWorkspace(payload: {
    owner_user_id: string;
    body: CreateWorkspaceBodyDto;
  }): Promise<WorkspaceResponseDto> {
    const [new_workspace] = await db
      .insert(workspaces)
      .values({ owner_user_id: payload.owner_user_id, ...payload.body })
      .returning();

    await db
      .insert(workspace_members)
      .values({
        workspace_id: new_workspace.id,
        user_id: payload.owner_user_id,
        invited_by: payload.owner_user_id,
      })
      .returning();

    return new_workspace;
  }

  async fetchCurrentUserWorkspaces(profile_id: string) {
    const workspace_list = await db
      .select()
      .from(workspaces)
      .where(eq(workspaces.owner_user_id, profile_id));
    if (workspace_list.length > 0) return workspace_list;
    return [];
  }

  async getWorkspaceDetail(payload: {
    workspace_id: string;
    user_id: string;
  }): Promise<WorkspaceResponseDto> {
    const [workspace] = await db
      .select()
      .from(workspaces)
      .where(
        and(
          eq(workspaces.owner_user_id, payload.user_id),
          eq(workspaces.id, payload.workspace_id),
        ),
      );
    if (workspace) return workspace;
    throw new NotFoundException();
  }

  async updateWorkspace(payload: {
    workspace_id: string;
    profile_id: string;
    body: CreateWorkspaceBodyDto;
  }): Promise<WorkspaceResponseDto> {
    const [user_own_workspace] = await db
      .select()
      .from(workspaces)
      .where(
        and(
          eq(workspaces.owner_user_id, payload.profile_id),
          eq(workspaces.id, payload.workspace_id),
        ),
      );

    if (!user_own_workspace) {
      throw new NotFoundException("You don't own a workspace");
    }

    const [result] = await db
      .update(workspaces)
      .set({ ...payload.body })
      .where(eq(workspaces.owner_user_id, payload.profile_id))
      .returning();

    return result;
  }

  async getWorkspaceMembers({
    workspace_id = '',
    page = 1,
    pageSize = 10,
  }: {
    workspace_id: string | undefined;
    page?: number;
    pageSize?: number;
  }): Promise<PaginatedResponseDto<WorkSpaceMemberResponseDto>> {
    const { user_id, created_at, ...rest } = getTableColumns(profile_info); // exclude user_id

    const [workspace] = await db
      .select()
      .from(workspaces)
      .where(eq(workspaces.id, workspace_id));

    if (!workspace) {
      throw new NotFoundException('Workspace not found or doesnt exist');
    }

    const data = await db
      .select({
        ...rest,
        email: users.email,
      })
      .from(workspace_members)
      .where(eq(workspace_members.workspace_id, workspace_id))
      .leftJoin(
        workspace_members,
        eq(workspace_members.user_id, profile_info.id),
      )
      .orderBy(desc(profile_info.created_at))
      .limit(pageSize)
      .offset(
        this.paginationService.getOffsetValue({
          currentPage: page,
          itemsPerPage: pageSize,
        }),
      );

    const [totalItems] = await db.select({ count: count() }).from(users);
    return {
      data,
      meta: this.paginationService.getMetaData({
        currentPage: page,
        itemsPerPage: pageSize,
        totalItems: totalItems.count,
        itemCount: data.length,
      }),
    };
  }

  async removeWorkspaceMember(payload: {
    workspace_id: string;
    user_id: string;
  }) {
    await db
      .delete(workspace_members)
      .where(
        and(
          eq(workspace_members.user_id, payload.user_id),
          eq(workspace_members.id, payload.workspace_id),
        ),
      );
  }

  async inviteWorkspaceMember(payload: {
    invited_by: string;
    body: InviteWorkspaceMemberBodyDto;
  }): Promise<WorkSpaceMemberResponseDto> {
    const [inserted_workspace_member] = await db
      .insert(workspace_members)
      .values({
        workspace_id: payload.body.workspace_id,
        user_id: payload.body.user_id,
        invited_by: payload.invited_by,
      })
      .returning();

    if (!inserted_workspace_member) {
      throw new InternalServerErrorException('Failed to invite member');
    }

    const { user_id, created_at, ...rest } = getTableColumns(profile_info); // exclude user_id
    const [workspace_member] = await db
      .select({
        ...rest,
        email: users.email,
      })
      .from(workspace_members)
      .where(eq(workspace_members.workspace_id, payload.body.workspace_id))
      .leftJoin(
        workspace_members,
        eq(workspace_members.user_id, profile_info.id),
      );

    return workspace_member;
  }
}
