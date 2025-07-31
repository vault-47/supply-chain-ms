import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

export class WorkSpaceMemberResponseDto {
  @ApiProperty({
    required: false,
    example: 'id-here',
  })
  workspace_id: string | null;

  @ApiProperty({
    required: false,
    example: 'id-here',
  })
  user_id: string | null;

  @ApiProperty({
    required: false,
    example: 'id-here',
  })
  invited_by: string | null;

  @ApiProperty({
    required: false,
    example: '2025-06-05 06:55:28.677072+01',
  })
  joined_at: Date | null;

  @ApiProperty({ type: UserResponseDto })
  user: UserResponseDto | null;
}
