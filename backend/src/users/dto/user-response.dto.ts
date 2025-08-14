import { ApiProperty } from '@nestjs/swagger';
import { AccountStatus } from 'src/shared/enums/account-status.enum';
import { Role } from 'src/shared/enums/role.enum';

export class UserResponseDto {
  @ApiProperty({
    required: false,
    example: 'id-here',
  })
  id: string | null;

  @ApiProperty({ required: false, example: 'Firstname' })
  first_name: string | null;

  @ApiProperty({ required: false, example: 'Lastname' })
  last_name: string | null;

  @ApiProperty({ required: false, example: 'user@mail.com' })
  email: string | null;

  @ApiProperty({
    required: false,
    example: AccountStatus.ACTIVE,
  })
  account_status: AccountStatus;

  @ApiProperty({
    required: false,
    example: Role.SHIPPER,
  })
  role: Role;

  @ApiProperty({
    required: false,
    example: '2025-06-05 06:55:28.677072+01',
  })
  created_at: Date | null;
}
