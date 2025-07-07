import { Module } from '@nestjs/common';
import { RequestQuotesController } from './request-quotes.controller';
import { RequestQuotesService } from './request-quotes.service';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { PaginationService } from 'src/pagination/pagination.service';

@Module({
  controllers: [RequestQuotesController],
  providers: [
    RequestQuotesService,
    AuthService,
    UsersService,
    PaginationService,
  ],
})
export class RequestQuotesModule {}
