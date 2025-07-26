import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetWorkspaceParamDto {
  @IsUUID()
  @ApiProperty({ type: String, description: 'id' })
  id: string;
}
