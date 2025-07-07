import { Injectable } from '@nestjs/common';
import { db } from 'src/database/connect';
import { quote_requests } from 'src/database/schema';
import { RequestQuoteRequestDto } from './dto/requests/request-quote-request.dto';

@Injectable()
export class RequestQuotesService {
  async create(user_uid: string, payload: RequestQuoteRequestDto) {
    console.log(payload);
    await db
      .insert(quote_requests)
      .values({ user_uid, ...payload })
      .returning();
  }
}
