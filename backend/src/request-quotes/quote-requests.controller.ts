import {
  Body,
  Controller,
  Get,
  NotImplementedException,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { ResponseMessage } from 'src/shared/decorator/response-message.decorator';
import { Roles } from 'src/shared/decorator/role.decorator';
import { Role } from 'src/shared/enums/role.enum';
import { QuoteRequestsService } from './quote-requests.service';
import { QuoteRequestRequestDto } from './dto/quote-request-request.dto';
import { AuthenticatedRequest } from 'src/shared/interfaces/authenticated-request.interface';
import {
  ApiOkWrappedPaginatedResponse,
  ApiOkWrappedResponse,
} from 'src/shared/decorator/swagger-response.decorator';
import { QuoteRequestResponseDto } from './dto/quote-request-response.dto';
import { RequestQuoteQueryDto } from './dto/quote-request-query.dto';
import { QuoteRequestUrgencyType } from './enums/quote-request-urgency-type.enum';

@Controller('quotes-requests')
export class QuoteRequestsController {
  constructor(private readonly requestQuoteService: QuoteRequestsService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SHIPPER)
  @Post()
  @ApiOperation({ summary: 'Request a quote' })
  @ResponseMessage('Quotes request created successfully')
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiOkWrappedResponse(
    QuoteRequestResponseDto,
    'Quote request sent successfully',
  )
  @ApiBody({ type: QuoteRequestRequestDto })
  @ApiBearerAuth('bearer')
  requestQuote(
    @Request() request: AuthenticatedRequest,
    @Body() requestQuote: QuoteRequestRequestDto,
  ) {
    const data = request?.user;
    return this.requestQuoteService.requestQuote(data.id, requestQuote);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SHIPPER, Role.VENDOR)
  @Get()
  @ApiOperation({ summary: 'List requested quotes' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiOkWrappedPaginatedResponse(QuoteRequestResponseDto, 'quote requests list')
  @ResponseMessage('List of requests')
  @ApiQuery({ name: 'page', required: false, type: Number, default: 1 })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, default: 10 })
  @ApiQuery({
    name: 'urgency',
    required: false,
    type: typeof QuoteRequestUrgencyType,
    enum: QuoteRequestUrgencyType,
  })
  @ApiQuery({
    name: 'search',
    required: true,
    type: String,
    default: undefined,
  })
  @ApiBearerAuth('bearer')
  async listRequestedQuotes(
    @Request() request: AuthenticatedRequest,
    @Query() queries: RequestQuoteQueryDto,
  ) {
    const data = request?.user;
    return this.requestQuoteService.listRequestedQuotes({
      user_id: data.id,
      page: queries.page,
      pageSize: queries.pageSize,
      urgency: queries.urgency,
      search: queries.search,
    });
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SHIPPER, Role.VENDOR)
  @Post('/:id/respond')
  @ApiOperation({
    summary: 'Respond to a quote request. This creates a quote 🚧',
  })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ResponseMessage('Respond to request')
  @ApiBearerAuth('bearer')
  respondQuoteRequest() {
    throw new NotImplementedException();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SHIPPER, Role.VENDOR)
  @Get('/:id')
  @ApiOperation({
    summary:
      'Details of requested quote, should also return corresponding quotes 🚧',
  })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ResponseMessage('List of requests')
  @ApiBearerAuth('bearer')
  requestQuoteDetail() {
    throw new NotImplementedException();
  }
}
