import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { db } from 'src/database/connect';
import { quote_requests, users } from 'src/database/schema';
import { CreateRequestQuoteRequestDto } from './dto/create-request-quote-request.dto';
import { CreateRequestQuoteResponseDto } from './dto/create-request-quote-response.dto';
import { PaginatedResponseDto } from 'src/pagination/dto/pagination.dto';
import { and, count, desc, eq, getTableColumns, like, or } from 'drizzle-orm';
import { PaginationService } from 'src/pagination/pagination.service';
import { QuoteRequestUrgencyType } from './enums/quote-request-urgency-type.enum';
import generateRandomToken from 'src/shared/utils/generate-code';
import { Role } from 'src/shared/enums/role.enum';
import { alias } from 'drizzle-orm/pg-core';
import { QuoteRequestResponseDto } from './dto/quote-request-response.dto';

const { ...quote_requests_data_rest } = getTableColumns(quote_requests); // exclude password

@Injectable()
export class QuoteRequestsService {
  constructor(private readonly paginationService: PaginationService) {}

  async requestQuote(
    user_id: string,
    payload: CreateRequestQuoteRequestDto,
  ): Promise<CreateRequestQuoteResponseDto> {
    // check if vendor is an actual vendor
    const [vendor] = await db
      .select()
      .from(users)
      .where(and(eq(users.id, payload.vendor_id), eq(users.role, Role.VENDOR)));
    if (!vendor) {
      throw new BadRequestException('Select an actual vendor');
    }
    const [requested_quote] = await db
      .insert(quote_requests)
      .values({ user_id, qr_num: 'QR-' + generateRandomToken(6), ...payload })
      .returning();
    return requested_quote;
  }

  async requestedQuoteDetail(
    user_id: string,
    id: string,
  ): Promise<QuoteRequestResponseDto> {
    // check if current user is shipper / vendor of requested quote
    const [is_vendor_or_shipper_of_request] = await db
      .select()
      .from(quote_requests)
      .where(
        or(
          eq(quote_requests.user_id, user_id),
          eq(quote_requests.vendor_id, user_id),
        ),
      );
    if (!is_vendor_or_shipper_of_request) {
      throw new ForbiddenException(
        'You are not allowed access to this information',
      );
    }
    const user = alias(users, 'user');
    const vendor = alias(users, 'vendor');

    const { password, ...user_cols } = getTableColumns(user);
    const { password: _, ...vendor_cols } = getTableColumns(vendor);
    const { ...quote_request_data_rest } = getTableColumns(quote_requests); // exclude password
    const [requested_quote] = await db
      .select({
        ...quote_request_data_rest,
        user: user_cols,
        vendor: vendor_cols,
      })
      .from(quote_requests)
      .where(eq(quote_requests.id, id))
      .leftJoin(vendor, eq(vendor.id, quote_requests.user_id))
      .leftJoin(user, eq(user.id, quote_requests.vendor_id));
    if (!requested_quote) {
      throw new NotFoundException('Quote request not found');
    }
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
  }): Promise<PaginatedResponseDto<CreateRequestQuoteResponseDto>> {
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
