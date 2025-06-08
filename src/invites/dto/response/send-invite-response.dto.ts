import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/shared/dto/base-response.dto';
import { Role } from 'src/shared/enums/role.enum';

export class SendInvitationResponseDto {
  @ApiProperty({ example: 'user@mail.com' })
  email: string;

  @ApiProperty({
    example: Role.ADMIN,
  })
  role: Role;
}

export class SendInvitationResponseWrapperDto extends BaseResponseDto<SendInvitationResponseDto> {
  @ApiProperty({
    type: SendInvitationResponseDto,
  })
  declare data: SendInvitationResponseDto;
}
