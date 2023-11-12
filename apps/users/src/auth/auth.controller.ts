import { Controller, LoggerService, UseFilters } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { GET_USER_ID } from '../constants';
import { TokenTypeEnum, Tokens } from './types';
import { TokenService } from './token.service';
import { GET_USER_ROLE } from '@app/common/endpoints';
import { Role } from '@app/common/constants';
import { AuthService } from './auth.service';
import { HttpExceptionFilter } from '@app/common/filters';

@Controller()
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly logger: LoggerService
  ) {}

  @EventPattern(GET_USER_ID)
  async getUserById(@Payload('tokens') tokens: Tokens) {
    const { id } = await this.tokenService.verifyToken(
      tokens.access_token,
      TokenTypeEnum.ACCESS_TOKEN
    );

    this.logger.log(
      `User ID retrieved successfully: ${id}`,
      'AuthController.getUserById'
    );
    return id;
  }

  @EventPattern(GET_USER_ROLE)
  async getUserRole(@Payload('tokens') tokens: Tokens): Promise<Role> {
    const { id } = await this.tokenService.verifyToken(
      tokens.access_token,
      TokenTypeEnum.ACCESS_TOKEN
    );
    const userRole = await this.authService.getUserRole(id);
    this.logger.log(
      `User role retrieved successfully: ${userRole}`,
      'AuthController.getUserRole'
    );
    return userRole;
  }
}
