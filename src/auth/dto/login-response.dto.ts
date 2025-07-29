import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/shared/dto/base-response.dto';

export class LoginResponseDto {
  @ApiProperty({
    required: false,
    example: 'eyJhbGic...',
  })
  access_token: string;
}

export class LoginResponseWrapperDto extends BaseResponseDto<LoginResponseDto> {
  @ApiProperty({ type: LoginResponseDto })
  declare data: LoginResponseDto;
}
