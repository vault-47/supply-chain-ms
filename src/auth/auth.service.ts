import 'dotenv/config';

import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginRequestDto } from './dto/requests/login-request.dto';
import { invites, profile_info, users } from 'src/database/schema';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { db } from 'src/database/connect';
import { RegistrationRequestDto } from './dto/requests/registration-request.dto';
import { eq } from 'drizzle-orm';
import { Role } from 'src/shared/enums/role.enum';
import { genSalt, hash, compare } from 'bcrypt-ts';
import { LoginResponseDto } from './dto/responses/login-response.dto';
import { AccountStatus } from 'src/shared/enums/account-status.enum';
import { BaseResponseDto } from 'src/shared/dto/base-response.dto';
import { UserResponseDto } from 'src/users/dto/response/user-response.dto';
import { retry } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}
  async authenticateUser(payload: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.usersService.findUserByEmail(payload.email);
    const profile = await this.usersService.findProfileById(user.uid);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const hash = user.password;
    const isMatch = await compare(payload.password, hash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    } else if (profile.account_status === AccountStatus.SUSPENDED) {
      throw new UnauthorizedException(
        'Account has been suspended. Contact administrator for assistance',
      );
    } else {
      return this.signIn(user);
    }
  }

  async signIn(user: {
    uid: string;
    email: string;
  }): Promise<LoginResponseDto> {
    const token_payload = {
      sub: user.uid,
      email: user.email,
    };
    const access_token = await this.jwtService.signAsync(token_payload);
    return { access_token };
  }

  async validateToken(token: string): Promise<{
    sub: string;
    email: string;
    iat: number;
    exp: number;
  }> {
    return this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
  }

  async createSuperAdminAccount(
    payload: RegistrationRequestDto,
  ): Promise<UserResponseDto> {
    if (payload.role === Role.SUPER_ADMIN) {
      const [super_admin] = await db
        .select()
        .from(profile_info)
        .where(eq(profile_info.role, Role.SUPER_ADMIN));

      if (super_admin) {
        throw new ConflictException(
          'Cannot register another super admin. Super admin already exists',
        );
      }
    }

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
      account_status: AccountStatus.ACTIVE,
      role: payload.role,
    });
    await db.delete(invites).where(eq(invites.email, payload.email));
    const profile = await this.usersService.findProfileById(new_user.uid);
    return profile;
  }
}
