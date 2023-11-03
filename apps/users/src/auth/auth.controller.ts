import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { GET_USER_ID } from '../constants';
import { TokenTypeEnum, Tokens } from './types';
import { TokenService } from './token.service';

@Controller()
export class AuthController {
  constructor(private readonly tokenService: TokenService) {}

  @EventPattern(GET_USER_ID)
  async getUserById(@Payload('tokens') tokens: Tokens) {
    console.log('test');
    const { id } = await this.tokenService.verifyToken(
      tokens.access_token,
      TokenTypeEnum.ACCESS_TOKEN
    );
    return id;
  }
}
