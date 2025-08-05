import { Injectable } from '@nestjs/common';
import { db } from 'src/database/connect';
import { quote_requests } from 'src/database/schema';
import { QuoteRequestRequestDto } from './dto/quote-request-request.dto';
import { QuoteRequestResponseDto } from './dto/quote-request-response.dto';

@Injectable()
export class QuoteRequestsService {
  async requestQuote(
    user_id: string | null,
    payload: QuoteRequestRequestDto,
  ): Promise<QuoteRequestResponseDto> {
    const [requested_quote] = await db
      .insert(quote_requests)
      .values({ user_id, ...payload })
      .returning();
    return requested_quote;
  }
}
