import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginRequestDto {
  @IsEmail()
  @IsString()
  @MinLength(4)
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @IsString()
  @MinLength(4)
  @ApiProperty({ type: String, description: 'password' })
  password: string;
}
