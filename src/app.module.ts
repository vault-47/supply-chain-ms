import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users/users.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailModule } from './mail/mail.module';
import { MailService } from './mail/mail.service';
import { PaginationService } from './pagination/pagination.service';
import { InvitesModule } from './invites/invites.module';
import { InvitesService } from './invites/invites.service';
import { ProfileModule } from './profile/profile.module';
import { ProfileService } from './profile/profile.service';
import { QuotesModule } from './quotes/quotes.module';
import { QuotesService } from './quotes/quotes.service';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    InvitesModule,
    ProfileModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT as number | undefined,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
      defaults: {
        from: '"Supply Chain MS" <superadmin@supplychainms.co>',
      },
    }),
    MailModule,
    QuotesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthService,
    JwtService,
    UsersService,
    MailService,
    PaginationService,
    InvitesService,
    ProfileService,
    QuotesService,
  ],
})
export class AppModule {}
