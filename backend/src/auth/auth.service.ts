import 'dotenv/config';

import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginRequestDto } from './dto/login-request.dto';
import { profile_info, users, verifications } from 'src/database/schema';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { db } from 'src/database/connect';
import { RegistrationRequestDto } from './dto/registration-request.dto';
import { and, eq, gt } from 'drizzle-orm';
import { Role } from 'src/shared/enums/role.enum';
import { genSalt, hash, compare } from 'bcrypt-ts';
import { LoginResponseDto } from './dto/login-response.dto';
import { AccountStatus } from 'src/shared/enums/account-status.enum';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { MailService } from 'src/mail/mail.service';
import generateRandomToken from 'src/shared/utils/generate-code';
import { VerificationType } from 'src/shared/enums/verification-type';
import { VerifyAccountRequestDto } from './dto/verify-account-request.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private mailService: MailService,
  ) {}
  // USER REGISTRATION
  async register(payload: RegistrationRequestDto): Promise<UserResponseDto> {
    if (payload.role === Role.PLATFORM_ADMIN) {
      const [platform_admin] = await db
        .select()
        .from(users)
        .where(eq(users.role, Role.PLATFORM_ADMIN));
      if (platform_admin) {
        throw new ConflictException(
          'Cannot register another platform admin. Platform admin already exists',
        );
      }
    }

    // check if user exists
    const findUser = await this.usersService.getUserByEmail(payload.email);
    if (findUser) {
      throw new ConflictException('User account already exist');
    }

    const hashedPassword = await this.generateHashedPassword(payload.password);
    const [new_user] = await db
      .insert(users)
      .values({
        email: payload.email,
        password: hashedPassword,
        role: payload.role,
        account_status: AccountStatus.PENDING_VERIFICATION,
      })
      .returning();

    await db.insert(profile_info).values({
      user_id: new_user.id,
      first_name: payload.first_name,
      last_name: payload.last_name,
    });

    const verification_code = generateRandomToken();
    // save verificaiton code
    await db.insert(verifications).values({
      type: VerificationType.REGISTRATION,
      target: payload.email,
      code: verification_code,
      expires_at: new Date(Date.now() + 15 * 60 * 1000), // 15 min from now
    });
    // send verification
    await this.mailService.sendEmail({
      to: payload.email,
      subject: 'Verify account',
      html: `<p>Please verify your account. Use the following code: ${verification_code}</p>`,
    });

    const user = await this.usersService.getUser(new_user.id);
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
    return this.usersService.getUserByEmail(payload.email);
  }

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
}
