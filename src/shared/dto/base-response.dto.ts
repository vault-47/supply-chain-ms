import { ApiProperty } from '@nestjs/swagger';

export class BaseResponseDto<T = any> {
  @ApiProperty({ required: false })
  data: T;

  @ApiProperty({ example: 'Success', required: false })
  message: string;

  @ApiProperty({ example: true, required: false })
  status: boolean;
}
