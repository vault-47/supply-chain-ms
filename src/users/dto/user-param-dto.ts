import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class UserParamDto {
  @IsUUID()
  @ApiProperty({ type: String, description: 'uid' })
  uid: string;
}
