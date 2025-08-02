import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Match } from 'src/shared/decorator/match.decorator';
import { Role } from 'src/shared/enums/role.enum';

export class RegistrationRequestDto {
  @IsEmail()
  @IsString()
  @MinLength(4)
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @IsString()
  @MinLength(4)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @ApiProperty({ type: String, description: 'password' })
  password: string;

  @IsString()
  @MinLength(4)
  @Match('password')
  @ApiProperty({ type: String, description: 'Repeat password' })
  repeat_password: string;

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
    enum: [Role.PLATFORM_ADMIN, Role.SHIPPER_ADMIN, Role.VENDOR_ADMIN],
    description:
      'Role must be one of PLATFORM_ADMIN, SHIPPER_ADMIN, or VENDOR_ADMIN',
  })
  role: Role.PLATFORM_ADMIN | Role.SHIPPER_ADMIN | Role.VENDOR_ADMIN;
}
