import { Resolver, Args, Mutation, Query, Context } from '@nestjs/graphql';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthenticationError } from '@nestjs/apollo';
import { LoginUserInput, SignUpInput } from './dto';
import { Request, Response } from 'express';
import { HttpStatus, UseGuards } from '@nestjs/common';
import { NAME_JWT_COOKIE } from './constants';
import { MessageResponse } from './responses/message.response';
import { JwtAuthGuard } from './guards/authenticated.guard';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

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
      response.cookie(NAME_JWT_COOKIE, tokens);
      return {
        status: HttpStatus.OK,
        message: 'User was auth'
      };
    } catch (err) {
      throw err;
    }
  }

  @Mutation(() => User)
  async signup(@Args('signup') { ...credentails }: SignUpInput) {
    try {
      const result = await this.authService.signup(credentails);
      if (!result)
        throw new AuthenticationError(
          'Could not log-in with the provided credentials'
        );
      return result;
    } catch (err) {
      throw err;
    }
  }

  @Query(() => MessageResponse)
  @UseGuards(JwtAuthGuard)
  async protected(@Context('req') request: Request): Promise<MessageResponse> {
    console.log(request.session.id);

    return { message: 'private route', status: 200 };
  }
}
