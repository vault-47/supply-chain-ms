import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';
import { Match } from 'src/shared/decorator/match.decorator';

export class SetPasswordRequestDto {
  @IsEmail()
  @IsString()
  @MinLength(4)
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @IsString()
  @MinLength(6)
  @Match('code')
  @ApiProperty({ type: String, description: 'Verification code' })
  code: string;

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
}
