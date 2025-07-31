import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateWorkspaceBodyDto {
  @IsString()
  @ApiProperty({ type: String, description: 'name' })
  name: string;
}
