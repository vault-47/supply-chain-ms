import 'dotenv/config';

import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginRequestDto } from './dto/login-request.dto';
import { invites, profile_info, users } from 'src/database/schema';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { db } from 'src/database/connect';
import { RegistrationRequestDto } from './dto/registration-request.dto';
import { eq } from 'drizzle-orm';
import { Role } from 'src/shared/enums/role.enum';
import { genSalt, hash, compare } from 'bcrypt-ts';
import { LoginResponseDto } from './dto/login-response.dto';
import { AccountStatus } from 'src/shared/enums/account-status.enum';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { AccountType } from 'src/shared/enums/account-type.enum';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}
  async authenticateUser(payload: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.usersService.findUserByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const hash = user.password;
    const isMatch = await compare(payload.password, hash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    } else {
      const user_data = await this.usersService.getUser(user.id);
      if (user_data === undefined) {
        throw new UnauthorizedException(
          'Profile not found please contact admin for assistance',
        );
      }

      if (user_data?.account_status === AccountStatus.SUSPENDED) {
        throw new UnauthorizedException(
          'Account has been suspended. Contact administrator for assistance',
        );
      } else {
        return this.signIn(user);
      }
    }
  }

  async signIn(user: { id: string; email: string }): Promise<LoginResponseDto> {
    const token_payload = {
      sub: user.id,
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

  async generateHashedPassword(password: string) {
    const salt = await genSalt(10);
    const result = await hash(password, salt);
    return result;
  }

  async createSuperAdminAccount(
    payload: RegistrationRequestDto,
  ): Promise<UserResponseDto> {
    const [super_admin] = await db
      .select()
      .from(users)
      .where(eq(users.role, Role.SUPER_ADMIN));

    if (super_admin) {
      throw new ConflictException(
        'Cannot register another super admin. Super admin already exists',
      );
    }

    const hashedPassword = await this.generateHashedPassword(payload.password);

    const [new_user] = await db
      .insert(users)
      .values({
        email: payload.email,
        password: hashedPassword,
        role: Role.SUPER_ADMIN,
        account_type: AccountType.ADMIN,
        account_status: AccountStatus.ACTIVE,
      })
      .returning();

    await db.insert(profile_info).values({
      user_id: new_user.id,
      first_name: payload.first_name,
      last_name: payload.last_name,
    });
    await db.delete(invites).where(eq(invites.email, payload.email));
    const user = await this.usersService.getUser(new_user.id);
    return user;
  }
}
