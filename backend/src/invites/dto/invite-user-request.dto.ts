import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from 'src/shared/enums/role.enum';

export class InviteUserRequestDto {
  @IsEmail()
  @IsString()
  @MinLength(4)
  @ApiProperty({ type: String, description: 'email', default: 'user@mail.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'first_name' })
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'last_name' })
  last_name: string;

  @IsEnum(Role)
  @IsNotEmpty()
  @ApiProperty({
    enum: [
      Role.PLATFORM_STAFF,
      Role.SHIPPER_STAFF,
      Role.VENDOR_OPERATOR,
      Role.VENDOR_DRIVER,
    ],
    description:
      'Role must be one of PLATFORM_STAFF, SHIPPER_STAFF, VENDOR_OPERATOR, VENDOR_DRIVER',
  })
  role:
    | Role.PLATFORM_STAFF
    | Role.SHIPPER_STAFF
    | Role.VENDOR_OPERATOR
    | Role.VENDOR_DRIVER;
}
