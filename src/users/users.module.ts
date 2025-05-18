import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthService } from 'src/auth/auth.service';
import { MailService } from 'src/mail/mail.service';

@Module({
  providers: [UsersService, AuthService, MailService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
