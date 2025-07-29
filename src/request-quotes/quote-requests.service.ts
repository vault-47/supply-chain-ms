import { Injectable } from '@nestjs/common';
import { db } from 'src/database/connect';
import { quote_requests } from 'src/database/schema';
import { QuoteRequestRequestDto } from './dto/quote-request-request.dto';

@Injectable()
export class QuoteRequestsService {
  async create(user_uid: string, payload: QuoteRequestRequestDto) {
    await db
      .insert(quote_requests)
      .values({ user_uid, ...payload })
      .returning();
  }
}
