import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginResponseDto {
  @IsString()
  @ApiProperty({
    required: false,
    example: 'eyJhbGic...',
  })
  access_token: string;
}
