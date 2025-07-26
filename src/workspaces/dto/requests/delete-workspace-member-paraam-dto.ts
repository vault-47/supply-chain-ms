import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class DeleteWorkspaceMemberParamDto {
  @IsUUID()
  @ApiProperty({ type: String, description: 'user_uid' })
  user_uid: string;

  @IsUUID()
  @ApiProperty({ type: String, description: 'workspace_uid' })
  workspace_uid: string;
}
