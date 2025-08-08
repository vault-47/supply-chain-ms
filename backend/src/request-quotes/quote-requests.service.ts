import { Injectable } from '@nestjs/common';
import { db } from 'src/database/connect';
import { quote_requests } from 'src/database/schema';
import { QuoteRequestRequestDto } from './dto/quote-request-request.dto';
import { QuoteRequestResponseDto } from './dto/quote-request-response.dto';
import { PaginatedResponseDto } from 'src/pagination/dto/pagination.dto';
import { and, count, desc, eq, getTableColumns, like, or } from 'drizzle-orm';
import { PaginationService } from 'src/pagination/pagination.service';
import { QuoteRequestUrgencyType } from './enums/quote-request-urgency-type.enum';
import generateRandomToken from 'src/shared/utils/generate-code';

const { ...quote_requests_data_rest } = getTableColumns(quote_requests); // exclude password

@Injectable()
export class QuoteRequestsService {
  constructor(private readonly paginationService: PaginationService) {}

  async requestQuote(
    user_id: string | null,
    payload: QuoteRequestRequestDto,
  ): Promise<QuoteRequestResponseDto> {
    const [requested_quote] = await db
      .insert(quote_requests)
      .values({ user_id, qr_num: 'QR-' + generateRandomToken(6), ...payload })
      .returning();
    return requested_quote;
  }

  async listRequestedQuotes({
    user_id,
    page = 1,
    pageSize = 10,
    urgency = undefined,
    search = undefined,
  }: {
    user_id: string | null;
    page?: number;
    pageSize?: number;
    urgency?: QuoteRequestUrgencyType | undefined;
    search?: string | undefined;
  }): Promise<PaginatedResponseDto<QuoteRequestResponseDto>> {
    const whereUserId =
      user_id != undefined ? eq(quote_requests.user_id, user_id) : undefined;
    const whereVendorId =
      user_id != undefined ? eq(quote_requests.vendor_id, user_id) : undefined;
    const whereUrgency =
      urgency != undefined ? eq(quote_requests.urgency, urgency) : undefined;
    const whereSearch =
      search != undefined ? like(quote_requests.qr_num, search) : undefined;

    const data = await db
      .select({
        ...quote_requests_data_rest,
      })
      .from(quote_requests)
      .where(and(or(whereUserId, whereVendorId), whereUrgency, whereSearch))
      .orderBy(desc(quote_requests.created_at))
      .limit(pageSize)
      .offset(
        this.paginationService.getOffsetValue({
          currentPage: page,
          itemsPerPage: pageSize,
        }),
      );

    const [totalItems] = await db
      .select({ count: count() })
      .from(quote_requests);

    return {
      data,
      meta: this.paginationService.getMetaData({
        currentPage: page,
        itemsPerPage: pageSize,
        totalItems: totalItems.count,
        itemCount: data.length,
      }),
    };
  }
}
