import { Resolver, Args, Mutation, Query, Context } from '@nestjs/graphql';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthenticationError } from '@nestjs/apollo';
import { LoginUserInput, SignUpInput } from './dto';
import { Response } from 'express';
import {
  HttpStatus,
  LoggerService,
  UseFilters,
  UseGuards
} from '@nestjs/common';
import { NAME_JWT_COOKIE } from './constants';
import { MessageResponse } from './responses/message.response';
import { Tokens } from './types';
import { JwtAuthGuard } from '@app/common/auth';
import { Cookie } from '@app/common/decorator';
import { HttpExceptionFilter } from '@app/common/filters';

@Resolver(() => User)
@UseFilters(HttpExceptionFilter)
export class AuthResolver {
  constructor(
    private readonly logger: LoggerService,
    private readonly authService: AuthService
  ) {}

  @Query(() => MessageResponse)
  async login(
    @Args() credentails: LoginUserInput,
    @Context('res') response: Response
  ): Promise<MessageResponse> {
    try {
      const tokens = await this.authService.login(credentails);
      if (!tokens)
        throw new AuthenticationError(
          'Could not log-in with the provided credentials'
        );

      this.logger.log(
        'User was authenticated successfully',
        'AuthResolver.login'
      );
      response.cookie(NAME_JWT_COOKIE, tokens);
      return {
        status: HttpStatus.OK,
        message: 'User was auth'
      };
    } catch (err) {
      throw err;
    }
  }

  @Mutation(() => MessageResponse)
  async signup(
    @Args('signup') { ...credentails }: SignUpInput,
    @Context('res') response: Response
  ) {
    try {
      const tokens = await this.authService.signup(credentails);
      response.cookie(NAME_JWT_COOKIE, tokens);
      this.logger.log(
        'User was signed up and authenticated successfully',
        'AuthResolver.signup'
      );
      return {
        status: HttpStatus.OK,
        message: 'User was auth'
      };
    } catch (err) {
      throw err;
    }
  }

  @Mutation(() => MessageResponse)
  @UseGuards(JwtAuthGuard)
  async logout(
    @Cookie(NAME_JWT_COOKIE) tokens: Tokens,
    @Context('res') response: Response
  ): Promise<MessageResponse> {
    await this.authService.logout(tokens);
    response.clearCookie(NAME_JWT_COOKIE);
    this.logger.log('User was logged out successfully', 'AuthResolver.logout');
    return { message: 'user was logout', status: 200 };
  }

  @Query(() => MessageResponse)
  @UseGuards(JwtAuthGuard)
  async updateTokens(@Cookie(NAME_JWT_COOKIE) tokens: Tokens) {
    await this.authService.updateRefreshToken(tokens.refresh_token);
    this.logger.log(
      'Refresh token has been updated successfully',
      'AuthResolver.updateTokens'
    );
    return {
      message: 'Refresh token has been updated',
      status: HttpStatus.OK
    };
  }

  @Query(() => MessageResponse)
  @UseGuards(JwtAuthGuard)
  async updateAccessToken(
    @Cookie(NAME_JWT_COOKIE) tokens: Tokens
  ): Promise<MessageResponse> {
    await this.authService.updatehAccessToken(tokens.refresh_token);
    this.logger.log(
      'Access token has been updated successfully',
      'AuthResolver.updateAccessToken'
    );
    return {
      message: 'Acess token has been updated',
      status: HttpStatus.OK
    };
  }
}
