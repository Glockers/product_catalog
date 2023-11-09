import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { GET_USER_ID } from '../constants';
import { TokenTypeEnum, Tokens } from './types';
import { TokenService } from './token.service';
import { GET_USER_ROLE } from '@app/common/endpoints';
import { Role } from '@app/common/constants';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService
  ) {}

  @EventPattern(GET_USER_ID)
  async getUserById(@Payload('tokens') tokens: Tokens) {
    const { id } = await this.tokenService.verifyToken(
      tokens.access_token,
      TokenTypeEnum.ACCESS_TOKEN
    );
    return id;
  }

  @EventPattern(GET_USER_ROLE)
  async getUserRole(@Payload('tokens') tokens: Tokens): Promise<Role> {
    const { id } = await this.tokenService.verifyToken(
      tokens.access_token,
      TokenTypeEnum.ACCESS_TOKEN
    );
    return await this.authService.getUserRole(id);
  }
}
