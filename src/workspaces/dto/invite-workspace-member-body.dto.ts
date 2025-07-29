import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class InviteWorkspaceMemberBodyDto {
  @IsUUID()
  @ApiProperty({ type: String, description: 'user_id' })
  user_id: string;

  @IsUUID()
  @ApiProperty({ type: String, description: 'workspace_uid' })
  workspace_uid: string;
}
