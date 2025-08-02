import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { count, desc, eq } from 'drizzle-orm';
import { db } from 'src/database/connect';
import { invites } from 'src/database/schema';
import { Role } from 'src/shared/enums/role.enum';
import { InviteUserRequestDto } from './dto/invite-user-request.dto';
import { MailService } from 'src/mail/mail.service';
import generateRandomToken from 'src/shared/utils/generate-code';
import { PaginationService } from 'src/pagination/pagination.service';
import { PaginatedResponseDto } from 'src/pagination/dto/pagination.dto';
import { InvitationResponseDto } from './dto/invitation-response.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class InvitesService {
  constructor(
    private readonly mailService: MailService,
    private readonly paginationService: PaginationService,
    private readonly usersService: UsersService,
  ) {}

  async inviteUser(inviteUserRequest: InviteUserRequestDto) {
    const user = await this.usersService.findUserByEmail(
      inviteUserRequest.email,
    );
    if (user) {
      throw new ConflictException(
        `User with email ${inviteUserRequest.email} already exists`,
      );
    }

    if ([Role.PLATFORM_ADMIN].includes(inviteUserRequest.role)) {
      throw new ForbiddenException(
        `Invitation cannot be sent to user with ${inviteUserRequest.role} role`,
      );
    }

    const otp_code = generateRandomToken();

    const [existing_invite] = await db
      .select()
      .from(invites)
      .where(eq(invites.email, inviteUserRequest.email));
    if (!existing_invite) {
      await db.insert(invites).values({
        code: otp_code,
        role: inviteUserRequest.role,
        email: inviteUserRequest.email,
      });
    } else {
      await db
        .update(invites)
        .set({ code: otp_code })
        .where(eq(invites.email, inviteUserRequest.email));
    }

    if (
      [Role.VENDOR_ADMIN, Role.SHIPPER_ADMIN].includes(inviteUserRequest.role)
    ) {
      await this.mailService.sendEmail({
        to: inviteUserRequest.email,
        subject: 'Customer invitation',
        html: `<p>Hello there, you have been invited to join Supplychain MS. Click the link below to proceed with onboarding your business<a href='http://localhost:3000/onbaording/customer?code=${otp_code}'>Click me</a></p>`,
      });
    } else if (
      [
        Role.PLATFORM_STAFF,
        Role.SHIPPER_STAFF,
        Role.VENDOR_DRIVER,
        Role.VENDOR_OPERATOR,
      ].includes(inviteUserRequest.role)
    ) {
      await this.mailService.sendEmail({
        to: inviteUserRequest.email,
        subject: 'Admin invitation',
        html: `<p>Hello there, you have been invited to join Supplychain MS. Click the link below to proceed with onboarding <a href='http://localhost:3000/onboarding/admin?code=${otp_code}&role=${inviteUserRequest.role}&email=${inviteUserRequest.email}'>Click me</a></p>`,
      });
    }
    return inviteUserRequest;
  }

  async invites({
    page = 1,
    pageSize = 10,
    role = undefined,
  }: {
    page?: number;
    pageSize?: number;
    role?: Role | undefined;
  }): Promise<PaginatedResponseDto<InvitationResponseDto>> {
    const where = role != undefined ? eq(invites.role, role) : undefined;

    const data = await db
      .select()
      .from(invites)
      .where(where)
      .orderBy(desc(invites.created_at))
      .limit(pageSize)
      .offset(
        this.paginationService.getOffsetValue({
          currentPage: page,
          itemsPerPage: pageSize,
        }),
      );

    const [totalItems] = await db.select({ count: count() }).from(invites);

    return {
      data,
      meta: this.paginationService.getMetaData({
        currentPage: page,
        itemsPerPage: pageSize,
        totalItems: totalItems.count,
        itemCount: data.length,
      }),
    };
  }
}
