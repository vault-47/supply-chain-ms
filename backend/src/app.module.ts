import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailModule } from './mail/mail.module';
import { InvitesModule } from './invites/invites.module';
import { ProfileModule } from './profile/profile.module';
import { QuotesModule } from './quotes/quotes.module';
import { QuoteRequestsModule } from './request-quotes/quote-requests.module';

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
    QuoteRequestsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
