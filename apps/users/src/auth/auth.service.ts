import {
  ConflictException,
  ForbiddenException,
  Injectable
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { TokenTypeEnum, Tokens } from './types/tokens.type';
import { LoginUserInput, SignUpInput } from './dto';
import { TokenService } from './token.service';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthSession } from './entities/auth.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { Role } from '@app/common/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
    @InjectRepository(AuthSession)
    private authSessionRepository: Repository<AuthSession>
  ) {}

  async signup(user: SignUpInput): Promise<Tokens> {
    const selectedUser = await this.userService.findOneByLogin(user.login);
    if (selectedUser) {
      throw new ConflictException('USER ALREADY REG');
    }

    const hash = await this.hashData(user.password);
    const createdUser = await this.userService.create({
      ...user,
      password: hash
    });

    const tokens = await this.tokenService.getTokens(createdUser.id);
    await this.saveRefreshToken(createdUser.id, tokens.refresh_token);
    return tokens;
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

    const tokens = await this.tokenService.getTokens(selectedUser.id);

    await this.saveRefreshToken(selectedUser.id, tokens.refresh_token);
    return tokens;
  }

  async logout(tokens: Tokens) {
    const { id } = await this.tokenService.verifyToken(
      tokens.access_token,
      TokenTypeEnum.ACCESS_TOKEN
    );

    return await this.resetRefreshToken(id);
  }

  async updatehAccessToken(rt: string): Promise<Tokens> {
    const { id } = await this.tokenService.verifyToken(
      rt,
      TokenTypeEnum.REFRESH_TOKEN
    );

    const newTokens = await this.tokenService.getTokens(id);

    return {
      access_token: newTokens.access_token,
      refresh_token: rt
    };
  }

  async updateRefreshToken(rt: string) {
    const { id } = await this.verfifyRefreshToken(rt);
    const newTokens = await this.tokenService.getTokens(id);
    await this.saveRefreshToken(id, newTokens.refresh_token);
    return newTokens;
  }

  async getUserRole(userID: number): Promise<Role> {
    const { role } = await this.userService.findOneById(userID);
    return role;
  }

  async verfifyRefreshToken(rt: string) {
    const isExistRt = await this.checkIfRtIsWhiteListed(rt);

    if (!isExistRt) throw new ConflictException('Not correct refresh token');

    return await this.tokenService.verifyToken(rt, TokenTypeEnum.REFRESH_TOKEN);
  }

  async checkIfRtIsWhiteListed(rt: string): Promise<boolean> {
    const rtRecord = await this.authSessionRepository.findOneBy({
      hashedRt: rt
    });

    if (!rtRecord) false;
    return true;
  }

  private async resetRefreshToken(id: number) {
    await this.authSessionRepository.update(
      {
        user: { id },
        hashedRt: Not(IsNull())
      },
      {
        hashedRt: null
      }
    );
  }

  private async saveRefreshToken(id: number, rt: string) {
    return await this.authSessionRepository.update(
      { user: { id } },
      {
        hashedRt: rt
      }
    );
  }

  private async hashData(data: string): Promise<string> {
    return await bcrypt.hash(data, 10);
  }
}
