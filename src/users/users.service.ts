import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { and, count, desc, eq } from 'drizzle-orm';
import { db } from 'src/database/connect';
import { invites, profile_info, users } from 'src/database/schema';
import { UserAcceptInviteRequestDto } from './dto/requests/accept-invite-request.dto';
import { genSalt, hash } from 'bcrypt-ts';
import { PaginationService } from 'src/pagination/pagination.service';
import { PaginatedResponseDto } from 'src/pagination/dto/pagination.dto';
import { UserResponseDto } from './dto/response/user-response.dto';
import { Role } from 'src/shared/enums/role.enum';
import { AccountStatus } from 'src/shared/enums/account-status.enum';

@Injectable()
export class UsersService {
  constructor(private readonly paginationService: PaginationService) {}

  async getAllUsers({
    page = 1,
    pageSize = 10,
    role = undefined,
  }: {
    page?: number;
    pageSize?: number;
    role?: Role | undefined;
  }): Promise<PaginatedResponseDto<UserResponseDto>> {
    const where = role != undefined ? eq(profile_info.role, role) : undefined;

    const data = await db
      .select({
        uid: profile_info.user_id,
        first_name: profile_info.first_name,
        last_name: profile_info.last_name,
        role: profile_info.role,
        account_status: profile_info.account_status,
        email: users.email,
        created_at: users.created_at,
      })
      .from(profile_info)
      .where(where)
      .leftJoin(users, eq(users.uid, profile_info.user_id))
      .orderBy(desc(users.created_at))
      .limit(pageSize)
      .offset(
        this.paginationService.getOffsetValue({
          currentPage: page,
          itemsPerPage: pageSize,
        }),
      );

    const [totalItems] = await db.select({ count: count() }).from(users);

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
  async findUserByEmail(email: string) {
    const [result] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    return result;
  }

  async findProfileById(id: string): Promise<UserResponseDto> {
    const [result] = await db
      .select({
        uid: profile_info.user_id,
        first_name: profile_info.first_name,
        last_name: profile_info.last_name,
        role: profile_info.role,
        account_status: profile_info.account_status,
        email: users.email,
        created_at: users.created_at,
      })
      .from(profile_info)
      .leftJoin(users, eq(users.uid, profile_info.user_id))
      .where(eq(profile_info.user_id, id));
    return result;
  }

  async createUserAccount(
    invite_code: string,
    payload: UserAcceptInviteRequestDto,
  ) {
    // validate otp for admins, vendors and shippers
    const [invite] = await db
      .select()
      .from(invites)
      .where(
        and(
          eq(invites.code, invite_code),
          eq(invites.email, payload.email),
          eq(invites.role, payload.role),
        ),
      );

    if (!invite) {
      throw new UnauthorizedException(
        'Incorrect invitation request. Contact administrator for assistance.',
      );
    }

    const user = await this.findUserByEmail(payload.email);
    if (!user) {
      const salt = await genSalt(10);
      const result = await hash(payload.password, salt);
      const [new_user] = await db
        .insert(users)
        .values({ email: payload.email, password: result })
        .returning();
      await db.insert(profile_info).values({
        user_id: new_user.uid,
        first_name: payload.first_name,
        last_name: payload.last_name,
        role: payload.role,
        account_status: AccountStatus.ACTIVE,
      });
      await db.delete(invites).where(eq(invites.email, payload.email));
      return {
        message: 'User account has been created',
      };
    } else {
      throw new ConflictException(
        'User account with email already exists. Use another email',
      );
    }
  }
}
