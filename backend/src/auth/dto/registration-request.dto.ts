import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Match } from 'src/shared/decorator/match.decorator';
import { AccountType } from 'src/shared/enums/account-type.enum';
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
}
