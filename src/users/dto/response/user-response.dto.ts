import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, IsUUID } from 'class-validator';
import { Role } from 'src/shared/enums/role.enum';

export class UserResponseDto {
  @IsUUID()
  @IsString()
  @ApiProperty({
    required: false,
    example: '6547b7cd-0832-43ef-ab69-edb20b931b18',
  })
  uid: string | null;

  @IsString()
  @ApiProperty({
    required: false,
    example: 'first_name',
  })
  first_name: string;

  @IsString()
  @ApiProperty({
    required: false,
    example: 'last_name',
  })
  last_name: string;

  @IsEmail()
  @IsString()
  @ApiProperty({ required: false, example: 'user@mail.com' })
  email: string | null;

  @IsEnum(Role)
  @ApiProperty({
    required: false,
    example: Role.SHIPPER,
  })
  role: Role;

  @IsString()
  @ApiProperty({
    required: false,
    example: '2025-06-05 06:55:28.677072+01',
  })
  created_at: Date | null;
}
