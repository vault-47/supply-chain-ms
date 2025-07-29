import { ApiProperty } from '@nestjs/swagger';

export class WorkspaceResponseDto {
  @ApiProperty({
    required: false,
    example: 'id-here',
  })
  id: string | null;

  @ApiProperty({
    required: false,
    example: 'id-here',
  })
  owner_user_id: string | null;

  @ApiProperty({
    required: false,
    example: 'name here',
  })
  name: string | null;

  @ApiProperty({
    required: false,
    example: '2025-06-05 06:55:28.677072+01',
  })
  created_at: Date | null;
}
