import { ApiProperty } from '@nestjs/swagger';

export class ProfileResponseDto {
  @ApiProperty({
    required: false,
    example: 'id-here',
  })
  id: string | null;

  @ApiProperty({
    required: false,
    example: 'first_name',
  })
  first_name: string;

  @ApiProperty({
    required: false,
    example: 'last_name',
  })
  last_name: string;

  @ApiProperty({
    required: false,
    example: '2025-06-05 06:55:28.677072+01',
  })
  created_at: Date | null;
}
