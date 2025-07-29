import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID, Min } from 'class-validator';
import { QuoteRequestUrgencyType } from 'src/request-quotes/enums/quote-request-urgency-type.enum';

export class QuoteRequestRequestDto {
  @IsString()
  @IsUUID()
  @ApiProperty({ type: String, description: 'vendor_uid' })
  vendor_uid: string;

  @IsString()
  @ApiProperty({ type: String, description: 'origin_address' })
  origin_address: string;

  @IsString()
  @ApiProperty({ type: String, description: 'destination_address' })
  destination_address: string;

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
  additional_note: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'urgency',
    default: QuoteRequestUrgencyType.STANDARD,
  })
  urgency: QuoteRequestUrgencyType;
}
