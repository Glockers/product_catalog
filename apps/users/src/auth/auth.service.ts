import {
  ConflictException,
  ForbiddenException,
  Injectable
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserInput } from '../users/dto/create-user.input';
import * as bcrypt from 'bcrypt';
import { LoginUserInput } from './dto/auth.input';
import { Tokens } from './types/tokens.type';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AT_EXPIRES, RT_EXPIRES } from './constants/jwt';

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

  async login(user: LoginUserInput) {
    const selectedUser = await this.userService.findOneByLogin(user.login);
    if (!selectedUser) throw new ForbiddenException('not correct login');

    const passwordMatched = await bcrypt.compare(
      user.password,
      selectedUser.password
    );

    if (!passwordMatched)
      throw new ForbiddenException('not correct login or password');

    // Mock data. Replace
    const tokens = {} as Tokens;

    return tokens;
  }

  async register(user: CreateUserInput) {
    const selectedUser = this.userService.findOneByLogin(user.login);
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

  async hashData(data: string): Promise<string> {
    return await bcrypt.hash(data, 10);
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

  async updateRtHash(id: number, rt: string) {
    const selecteduser = await this.userService.findOneById(id);
    selecteduser.hashedRt = rt;
    await this.userService.create(selecteduser);
  }
}
