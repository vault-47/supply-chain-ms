import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { QuoteRequestUrgencyType } from '../enums/quote-request-urgency-type.enum';

export class RequestQuoteQueryDto {
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
  @IsEnum(QuoteRequestUrgencyType)
  @ApiProperty({ type: String, required: false, description: 'urgency' })
  urgency?: QuoteRequestUrgencyType;
}
