import { Injectable } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  sendEmail({ to, subject, text, html }: ISendMailOptions) {
    return this.mailerService.sendMail({
      to,
      subject,
      text,
      html,
    });
  }
}
