import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { TokenTypeEnum, Tokens } from './types/tokens.type';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AT_EXPIRES, RT_EXPIRES } from './constants';
import { LoginUserInput, SignUpInput } from './dto';

@Injectable()
export class AuthService {
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

  async signup(user: SignUpInput) {
    const selectedUser = await this.userService.findOneByLogin(user.login);
    if (selectedUser) {
      throw new ConflictException('USER ALREADY REG');
    }

    const hash = await this.hashData(user.password);
    const createdUser = await this.userService.create({
      ...user,
      password: hash
    });

    const tokens = await this.getTokens(createdUser.id);
    await this.updateRtHash(createdUser.id, tokens.refresh_token);
    return createdUser;
  }

  async login(user: LoginUserInput) {
    const selectedUser = await this.userService.findOneByLogin(user.login);
    if (!selectedUser) throw new ForbiddenException('not correct login');

    const passwordMatched = await bcrypt.compare(
      user.password,
      selectedUser.password
    );

    if (!passwordMatched)
      throw new ForbiddenException('not correct login or password');

    const tokens = await this.getTokens(selectedUser.id);

    await this.updateRtHash(selectedUser.id, tokens.refresh_token);
    return tokens;
  }

  async getTokens(id: number): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          id
        },
        {
          secret: 'at_secret',
          expiresIn: AT_EXPIRES
        }
      ),
      this.jwtService.signAsync(
        {
          id
        },
        {
          secret: 'at_secret',
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
    const { id } = await this.jwtService.verifyAsync<any>(token, {
      secret: secret
    });

    const selectedUser = this.userService.findOneById(id);

    if (!selectedUser) throw new UnauthorizedException();

    return { id };
  }

  async updateRtHash(id: number, rt: string) {
    const selecteduser = await this.userService.findOneById(id);
    selecteduser.hashedRt = await this.hashData(rt);
    await this.userService.create(selecteduser);
  }

  async hashData(data: string): Promise<string> {
    return await bcrypt.hash(data, 10);
  }
}
