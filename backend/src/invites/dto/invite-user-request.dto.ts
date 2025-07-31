import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { Role } from 'src/shared/enums/role.enum';

export class InviteUserRequestDto {
  @IsEmail()
  @IsString()
  @MinLength(4)
  @ApiProperty({ type: String, description: 'email', default: 'user@mail.com' })
  email: string;

  @IsEnum(Role)
  @ApiProperty({
    type: String,
    description: 'role',
    default: Role.ADMIN,
  })
  role: Role;
}
