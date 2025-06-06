import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetaDto {
  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  itemCount: number;

  @ApiProperty()
  itemsPerPage: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  currentPage: number;
}

export class PaginatedResponseDto<T> {
  @ApiProperty({ isArray: true }) // can't infer T for Swagger
  data: T[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;
}
