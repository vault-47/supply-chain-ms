import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, IsUUID } from 'class-validator';
import { Role } from 'src/shared/enums/role.enum';

export class InvitationResponseDto {
  @IsUUID()
  @IsString()
  @ApiProperty({
    example: '6547b7cd-0832-43ef-ab69-edb20b931b18',
  })
  uid: string;

  @IsEmail()
  @IsString()
  @ApiProperty({ example: 'user@mail.com' })
  email: string;

  @IsString()
  @ApiProperty({
    example: '53G8F2',
  })
  code: string;

  @IsEnum(Role)
  @ApiProperty({
    example: Role.ADMIN,
  })
  role: Role;

  @IsString()
  @ApiProperty({
    example: '2025-06-05 06:55:28.677072+01',
  })
  created_at: Date;
}
