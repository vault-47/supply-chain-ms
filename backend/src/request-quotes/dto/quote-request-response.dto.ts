import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { QuoteRequestStatus } from '../enums/quote-request-status.enum';
import { QuoteRequestUrgencyType } from '../enums/quote-request-urgency-type.enum';

export class QuoteRequestResponseDto {
  @IsString()
  @IsUUID()
  @ApiProperty({ type: String, description: 'id' })
  id: string;

  @IsString()
  @IsUUID()
  @ApiProperty({ type: String, description: 'user_id' })
  user_id: string | null;

  @IsString()
  @IsUUID()
  @ApiProperty({ type: String, description: 'vendor_id' })
  vendor_id: string | null;

  @IsString()
  @ApiProperty({ type: String, description: 'origin_address' })
  origin_address: string | null;

  @IsString()
  @ApiProperty({ type: String, description: 'destination_address' })
  destination_address: string | null;

  @IsNumber()
  @Min(0)
  @ApiProperty({ type: Number, description: 'distance_km' })
  distance_km: number;

  @IsNumber()
  @Min(0)
  @ApiProperty({ type: Number, description: 'weight_kg' })
  weight_kg: number;

  @IsString()
  @ApiProperty({ type: String, description: 'goods_type' })
  goods_type: string;

  @IsString()
  @ApiProperty({ type: String, description: 'additional_note' })
  additional_note: string | null;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'urgency',
    default: QuoteRequestUrgencyType.STANDARD,
  })
  urgency: QuoteRequestUrgencyType;

  @IsEnum(QuoteRequestStatus)
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'status' })
  status: QuoteRequestStatus;

  @ApiProperty({
    required: false,
    example: '2025-06-05 06:55:28.677072+01',
  })
  created_at: Date | null;
}
