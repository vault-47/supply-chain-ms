import {
  Body,
  Controller,
  Get,
  NotImplementedException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { ResponseMessage } from 'src/shared/decorator/response-message.decorator';
import { Roles } from 'src/shared/decorator/role.decorator';
import { Role } from 'src/shared/enums/role.enum';
import { RequestQuotesService } from './request-quotes.service';
import { RequestQuoteRequestDto } from './dto/requests/request-quote-request.dto';
import { AuthenticatedRequest } from 'src/shared/interfaces/authenticated-request.interface';

@Controller('request-quotes')
export class RequestQuotesController {
  constructor(private readonly requestQuoteService: RequestQuotesService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SHIPPER)
  @Post()
  @ApiOperation({ summary: 'Request quote 🚧' })
  @ResponseMessage('Quotes request created successfully')
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiOkResponse({
    description: 'Quote request sent successfully',
    type: RequestQuoteRequestDto,
  })
  @ApiBody({ type: RequestQuoteRequestDto })
  @ApiBearerAuth('bearer')
  requestQuote(
    @Request() request: AuthenticatedRequest,
    @Body() requestQuote: RequestQuoteRequestDto,
  ) {
    const data = request?.user;
    return this.requestQuoteService.create(data.uid, requestQuote);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SHIPPER, Role.VENDOR)
  @Get()
  @ApiOperation({ summary: 'List requested quotes 🚧' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ResponseMessage('List of requests')
  @ApiBearerAuth('bearer')
  listRequestedQuotes() {
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
