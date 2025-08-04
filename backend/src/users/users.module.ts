import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { AdminUsersController, UsersController } from './users.controller';
import { AuthService } from 'src/auth/auth.service';
import { MailService } from 'src/mail/mail.service';
import { PaginationService } from 'src/pagination/pagination.service';

@Module({
  providers: [UsersService, AuthService, MailService, PaginationService],
  exports: [UsersService],
  controllers: [UsersController, AdminUsersController],
})
export class UsersModule {}
