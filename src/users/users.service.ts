import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from 'src/database/connect';
import { invites, profile_info, users } from 'src/database/schema';
import { Role } from 'src/shared/enums/role.enum';
import { InviteUserRequestDto } from './dto/invite-user-request.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsersService {
  constructor(private readonly mailService: MailService) {}

  async getAllUsers() {
    const result = await db.select().from(users);
    return result;
  }
  async findUserByEmail(email: string) {
    const [result] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    return result;
  }

  async findProfileById(id: string) {
    const [result] = await db
      .select({
        uid: profile_info.user_id,
        first_name: profile_info.first_name,
        last_name: profile_info.last_name,
        role: profile_info.role,
        email: users.email,
      })
      .from(profile_info)
      .leftJoin(users, eq(users.uid, profile_info.user_id))
      .where(eq(profile_info.user_id, id));
    return result;
  }

  async inviteCustomer(inviteUserRequestDto: InviteUserRequestDto) {
    if (
      [Role.SUPER_ADMIN, Role.DISPATCHER].includes(inviteUserRequestDto.role)
    ) {
      throw new ForbiddenException(
        `Invitation cannot be sent to user with ${inviteUserRequestDto.role} role`,
      );
    } else {
      const otp_code = String(Math.floor(Math.random() * 10000)).padStart(
        4,
        '0',
      );
      const [existing_invite] = await db
        .select()
        .from(invites)
        .where(eq(invites.email, inviteUserRequestDto.email));
      if (existing_invite) {
        await db
          .delete(invites)
          .where(eq(invites.email, inviteUserRequestDto.email));
      }
      await db.insert(invites).values({
        email: inviteUserRequestDto.email,
        code: otp_code,
      });
      if ([Role.VENDOR, Role.SHIPPER].includes(inviteUserRequestDto.role)) {
        await this.mailService.sendConfirmationEmail({
          to: inviteUserRequestDto.email,
          subject: 'Customer invitation',
          html: `<p>Hello there, you have been invited to join Supplychain MS. Click the link below to proceed with onboarding your business<a href='http://localhost:3000/onbaording/customer?code=${otp_code}'>Click me</a></p>`,
        });
        return {
          message: 'Invitation has been sent to customer',
          statusCode: HttpStatus.OK,
        };
      } else if (inviteUserRequestDto.role === Role.ADMIN) {
        await this.mailService.sendConfirmationEmail({
          to: inviteUserRequestDto.email,
          subject: 'Admin invitation',
          html: `<p>Hello there, you have been invited to join Supplychain MS. Click the link below to proceed with onboarding <a href='http://localhost:3000/onboarding/admin?code=${otp_code}'>Click me</a></p>`,
        });
        return {
          message: 'Invitation has been sent to admin',
          statusCode: HttpStatus.OK,
        };
      }
    }
  }
}
