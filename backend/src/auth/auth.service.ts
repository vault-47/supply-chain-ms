import 'dotenv/config';

import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginRequestDto } from './dto/login-request.dto';
import { users } from 'src/database/schema';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { db } from 'src/database/connect';
import { RegistrationRequestDto } from './dto/registration-request.dto';
import { eq, like } from 'drizzle-orm';
import { Role } from 'src/shared/enums/role.enum';
import { genSalt, hash, compare } from 'bcrypt-ts';
import { LoginResponseDto } from './dto/login-response.dto';
import { AccountStatus } from 'src/shared/enums/account-status.enum';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { SetPasswordRequestDto } from './dto/setpassword-request.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
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

    // ensure business_name is parsed
    if (payload.role !== Role.PLATFORM_ADMIN && !payload.business_name) {
      throw new BadRequestException('Please include business name');
    }

    // check if business_name already exists
    const [existing_business] = await db
      .select()
      .from(users)
      .where(like(users.business_name, payload.business_name));
    if (existing_business) {
      throw new ConflictException(
        'business with name already exists. Try another name',
      );
    }

    const hashedPassword = await this.generateHashedPassword(payload.password);
    const [new_user] = await db
      .insert(users)
      .values({
        email: payload.email,
        password: hashedPassword,
        business_name: payload.business_name ?? '',
        role: payload.role,
        account_status: AccountStatus.ACTIVE,
        first_name: payload.first_name,
        last_name: payload.last_name,
      })
      .returning();

    const user = await this.usersService.getUser(new_user.id);
    return user;
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

  // set password
  async setPassword(payload: SetPasswordRequestDto): Promise<boolean> {
    const salt = await genSalt(10);
    const result = await hash(payload.password, salt);
    await db
      .update(users)
      .set({
        password: result,
      })
      .where(eq(users.email, payload.email));
    return true;
  }
}
