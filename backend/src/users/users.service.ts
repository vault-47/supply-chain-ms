import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { and, count, desc, eq, getTableColumns } from 'drizzle-orm';
import { db } from 'src/database/connect';
import { invites, profile_info, users } from 'src/database/schema';
import { genSalt, hash } from 'bcrypt-ts';
import { PaginationService } from 'src/pagination/pagination.service';
import { PaginatedResponseDto } from 'src/pagination/dto/pagination.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { Role } from 'src/shared/enums/role.enum';
import { AccountStatus } from 'src/shared/enums/account-status.enum';
import { AcceptInviteRequestDto } from 'src/invites/dto/accept-invite-request.dto';
import { AccountType } from 'src/shared/enums/account-type.enum';

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
    if (result) return result;
    throw new NotFoundException();
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

  async createUserAccount(
    invite_code: string,
    payload: AcceptInviteRequestDto,
  ): Promise<UserResponseDto> {
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
        .values({
          email: payload.email,
          password: result,
          role: payload.role,
          account_status: AccountStatus.ACTIVE,
          account_type: [Role.ADMIN, Role.SUPER_ADMIN].includes(payload.role)
            ? AccountType.ADMIN
            : AccountType.CUSTOMER,
        })
        .returning();
      await db.insert(profile_info).values({
        user_id: new_user.id,
        first_name: payload.first_name,
        last_name: payload.last_name,
      });
      const profile = await this.getUser(new_user.id);
      await db.delete(invites).where(eq(invites.email, payload.email));
      return profile;
    } else {
      throw new ConflictException(
        'User account with email already exists. Use another email',
      );
    }
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
}
