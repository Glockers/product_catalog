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

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService
  ) {}

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

    const tokens = await this.tokenService.getTokens(createdUser.id);
    await this.tokenService.updateRtHash(createdUser.id, tokens.refresh_token);
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

    const tokens = await this.tokenService.getTokens(selectedUser.id);

    await this.tokenService.updateRtHash(selectedUser.id, tokens.refresh_token);
    return tokens;
  }

  async logout(tokens: Tokens) {
    const { id } = await this.tokenService.verifyToken(
      tokens.access_token,
      TokenTypeEnum.ACCESS_TOKEN
    );

    return await this.userService.resetRt(id);
  }

  async hashData(data: string): Promise<string> {
    return await bcrypt.hash(data, 10);
  }
}
