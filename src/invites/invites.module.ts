import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { MailService } from 'src/mail/mail.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { UsersService } from 'src/users/users.service';
import { InvitesService } from './invites.service';
import { InvitesController } from './invites.controller';

@Module({
  providers: [
    UsersService,
    AuthService,
    MailService,
    PaginationService,
    InvitesService,
  ],
  exports: [InvitesService],
  controllers: [InvitesController],
})
export class InvitesModule {}
