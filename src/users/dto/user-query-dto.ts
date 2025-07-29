import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsEnum, IsOptional, Min } from 'class-validator';
import { AccountStatus } from 'src/shared/enums/account-status.enum';
import { Role } from 'src/shared/enums/role.enum';

export class UserQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({
    type: Number,
    required: false,
    description: 'page',
    default: 1,
  })
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ type: Number, required: false, description: 'pageSize' })
  @Min(1)
  pageSize?: number;

  @IsOptional()
  @IsEnum(Role)
  @ApiProperty({ type: String, required: false, description: 'role' })
  role?: Role;

  @IsOptional()
  @IsEnum(AccountStatus)
  @ApiProperty({ type: String, required: false, description: 'accountStatus' })
  accountStatus?: AccountStatus;
}
