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
import { RolesGuard } from 'src/auth/guards/role.guard';
import { ResponseMessage } from 'src/shared/decorator/response-message.decorator';
import { Roles } from 'src/shared/decorator/role.decorator';
import { Role } from 'src/shared/enums/role.enum';

@Controller('quotes')
export class QuotesController {
  constructor() {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.VENDOR_ADMIN)
  @Post()
  @ApiOperation({ summary: 'Create quote 🚧' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ResponseMessage('Quote  created successfully')
  @ApiBearerAuth('bearer')
  createQuote() {
    throw new NotImplementedException();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.VENDOR_ADMIN)
  @Post('/:id/accept')
  @ApiOperation({ summary: 'Accept quote 🚧' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ResponseMessage('Quote accepted successfully')
  @ApiBearerAuth('bearer')
  acceptQuote() {
    throw new NotImplementedException();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.VENDOR_ADMIN)
  @Post('/:id/reject')
  @ApiOperation({ summary: 'Reject quote 🚧' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ResponseMessage('Quote rejected successfully')
  @ApiBearerAuth('bearer')
  rejectQuote() {
    throw new NotImplementedException();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.VENDOR_ADMIN, Role.SHIPPER_ADMIN)
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
