import {
  Controller,
  Get,
  NotImplementedException,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ResponseMessage } from 'src/shared/decorator/response-message.decorator';

@Controller('quotes')
export class QuotesController {
  constructor() {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Request quote 🚧' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ResponseMessage('Quotes request created successfully')
  @ApiBearerAuth('bearer')
  requestQuote() {
    throw new NotImplementedException();
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Fetch quotes 🚧' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ResponseMessage('Quotes fetched successfully')
  @ApiBearerAuth('bearer')
  getQuotes() {
    throw new NotImplementedException();
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  @ApiOperation({ summary: 'Fetch quote details 🚧' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ResponseMessage('Quote detaileds fetched successfully')
  @ApiBearerAuth('bearer')
  getQuote() {
    throw new NotImplementedException();
  }
}
