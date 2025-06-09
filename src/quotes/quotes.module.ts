import { Module } from '@nestjs/common';
import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { PaginationService } from 'src/pagination/pagination.service';

@Module({
  controllers: [QuotesController],
  providers: [QuotesService, AuthService, UsersService, PaginationService],
})
export class QuotesModule {}
