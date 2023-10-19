import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { TokenTypeEnum, Tokens } from './types/tokens.type';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AT_EXPIRES, RT_EXPIRES } from './constants';

@Injectable()
export class TokenService {
  private readonly AT_SECRET: string;
  private readonly RT_SECRET: string;

  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {
    this.AT_SECRET = this.configService.get<string>('SECRET_JWT_ACCESS');
    this.RT_SECRET = this.configService.get<string>('SECRET_JWT_REFRESH');
  }

  async getTokens(id: number): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          id
        },
        {
          secret: this.AT_SECRET,
          expiresIn: AT_EXPIRES
        }
      ),
      this.jwtService.signAsync(
        {
          id
        },
        {
          secret: this.RT_SECRET,
          expiresIn: RT_EXPIRES
        }
      )
    ]);
    return {
      access_token: at,
      refresh_token: rt
    };
  }

  async verifyToken(token: string, typeToken: TokenTypeEnum): Promise<any> {
    const secret =
      TokenTypeEnum.ACCESS_TOKEN === typeToken
        ? this.AT_SECRET
        : this.RT_SECRET;
    const { id } = await this.jwtService.verifyAsync(token, {
      secret: secret
    });

    const selectedUser = this.userService.findOneById(id);

    if (!selectedUser) throw new UnauthorizedException();

    return { id };
  }

  async hashData(data: string): Promise<string> {
    return await bcrypt.hash(data, 10);
  }
}
