import 'dotenv/config';

import {
  ConflictException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginRequestDto } from './dto/login-request.dto';
import { invites, profile_info, users } from 'src/database/schema';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { db } from 'src/database/connect';
import { RegistrationRequestDto } from './dto/registration-request.dto';
import { and, eq } from 'drizzle-orm';
import { Role } from 'src/shared/enums/role.enum';
import { genSalt, hash, compare } from 'bcrypt-ts';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}
  async authenticateUser(payload: LoginRequestDto) {
    const user = await this.usersService.findUserByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const hash = user.password;
    const isMatch = await compare(payload.password, hash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    } else {
      return this.signIn(user);
    }
  }

  async signIn(user: { uid: string; email: string }) {
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

  async createUserAccount(payload: RegistrationRequestDto) {
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
    } else {
      // TODO: Add condition for expired otp

      // validate otp for admins, vendors and shippers
      const [invite] = await db
        .select()
        .from(invites)
        .where(
          and(eq(invites.code, payload.code), eq(invites.email, payload.email)),
        );
      if (!invite) {
        throw new UnauthorizedException(
          'Incorrect OTP or OTP has expired. Contact administrator.',
        );
      } else {
        await db
          .delete(invites)
          .where(
            and(
              eq(invites.email, payload.email),
              eq(invites.code, payload.code),
            ),
          );
      }
    }

    const user = await this.usersService.findUserByEmail(payload.email);
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
      });
      return {
        message: 'User has been created',
        statusCode: HttpStatus.CREATED,
      };
    } else {
      throw new ConflictException(
        'User account with email already exists. Use another email',
      );
    }
  }
}
