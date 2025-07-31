import { Module } from '@nestjs/common';
import { QuoteRequestsController } from './quote-requests.controller';
import { QuoteRequestsService } from './quote-requests.service';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { PaginationService } from 'src/pagination/pagination.service';

@Module({
  controllers: [QuoteRequestsController],
  providers: [
    QuoteRequestsService,
    AuthService,
    UsersService,
    PaginationService,
  ],
})
export class QuoteRequestsModule {}
