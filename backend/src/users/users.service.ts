import { BadRequestException, Injectable } from '@nestjs/common';
import { and, count, desc, eq, getTableColumns, gt } from 'drizzle-orm';
import { db } from 'src/database/connect';
import { profile_info, users, verifications } from 'src/database/schema';
import { PaginationService } from 'src/pagination/pagination.service';
import { PaginatedResponseDto } from 'src/pagination/dto/pagination.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { Role } from 'src/shared/enums/role.enum';
import { AccountStatus } from 'src/shared/enums/account-status.enum';
import { VerifyAccountRequestDto } from 'src/auth/dto/verify-account-request.dto';
import { VerificationType } from 'src/shared/enums/verification-type';

const { user_id, ...profile_data_rest } = getTableColumns(profile_info); // exclude user_id
const { password, ...user_data_rest } = getTableColumns(users); // exclude password

@Injectable()
export class UsersService {
  constructor(private readonly paginationService: PaginationService) {}

  async getUser(user_id: string): Promise<UserResponseDto> {
    const result = await db
      .select({
        ...user_data_rest,
        profile: profile_data_rest,
      })
      .from(users)
      .leftJoin(profile_info, eq(users.id, profile_info.user_id))
      .where(eq(users.id, user_id))
      .then((rows) => rows[0]);
    return result;
  }

  async getUserByEmail(email: string): Promise<UserResponseDto> {
    const result = await db
      .select({
        ...user_data_rest,
        profile: profile_data_rest,
      })
      .from(users)
      .leftJoin(profile_info, eq(users.id, profile_info.user_id))
      .where(eq(users.email, email))
      .then((rows) => rows[0]);
    return result;
  }

  async getAllUsers({
    page = 1,
    pageSize = 10,
    role = undefined,
    status = undefined,
  }: {
    page?: number;
    pageSize?: number;
    role?: Role | undefined;
    status?: AccountStatus | undefined;
  }): Promise<PaginatedResponseDto<UserResponseDto>> {
    const whereRole = role != undefined ? eq(users.role, role) : undefined;
    const whereStatus =
      status != undefined ? eq(users.account_status, status) : undefined;

    const data = await db
      .select({
        ...user_data_rest,
        profile: profile_data_rest,
      })
      .from(users)
      .where(and(whereRole, whereStatus))
      .leftJoin(profile_info, eq(users.id, profile_info.user_id))
      .orderBy(desc(profile_info.created_at))
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
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0];
  }

  async findProfileById(profile_id: string) {
    const [result] = await db
      .select()
      .from(profile_info)
      .where(eq(profile_info.id, profile_id));
    return result;
  }

  async findUserById(id: string) {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async suspendUserAccount(id: string): Promise<UserResponseDto> {
    await db
      .update(users)
      .set({ account_status: AccountStatus.SUSPENDED })
      .where(eq(profile_info.user_id, id));

    const user = await this.getUser(id);
    return user;
  }

  async activateUserAccount(id: string): Promise<any> {
    await db
      .update(users)
      .set({ account_status: AccountStatus.ACTIVE })
      .where(eq(profile_info.user_id, id));
    const user = await this.getUser(id);
    return user;
  }

  //  VERIFY ACCOUNT
  async verifyAccount(
    payload: VerifyAccountRequestDto,
  ): Promise<UserResponseDto> {
    const now = new Date();
    const [verification] = await db
      .select()
      .from(verifications)
      .where(
        and(
          eq(verifications.type, VerificationType.REGISTRATION),
          eq(verifications.target, payload.email),
          eq(verifications.code, payload.code),
          gt(verifications.expires_at, now),
        ),
      );
    if (!verification) {
      throw new BadRequestException('Incorrect code or code is expired');
    }
    // update user account status
    await db
      .update(users)
      .set({ account_status: AccountStatus.ACTIVE })
      .where(eq(users.email, payload.email));
    // delete verification code
    await db
      .delete(verifications)
      .where(
        and(
          eq(verifications.type, VerificationType.REGISTRATION),
          eq(verifications.target, payload.email),
          eq(verifications.code, payload.code),
        ),
      );
    return this.getUserByEmail(payload.email);
  }
}
