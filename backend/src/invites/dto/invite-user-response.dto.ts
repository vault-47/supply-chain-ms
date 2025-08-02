import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/shared/enums/role.enum';

export class InviteUserResponseDto {
  @ApiProperty({ example: 'user@mail.com' })
  email: string;

  @ApiProperty({
    example: Role.PLATFORM_STAFF,
  })
  role: Role;
}
