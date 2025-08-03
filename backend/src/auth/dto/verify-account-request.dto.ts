import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { Match } from 'src/shared/decorator/match.decorator';

export class VerifyAccountRequestDto {
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
}
