import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthenticationError } from '@nestjs/apollo';
import { LoginUserInput, RegisterUserInput } from './dto/auth.input';
import { Tokens } from './types/tokens.type';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query('login')
  async login(@Args('user') user: LoginUserInput): Promise<Tokens> {
    try {
      const result = await this.authService.login(user);
      if (result) return result;
      throw new AuthenticationError(
        'Could not log-in with the provided credentials'
      );
    } catch (err) {
      throw err;
    }
  }

  @Mutation('signup')
  async signup(@Args('user') user: RegisterUserInput) {
    try {
      const result = await this.authService.register(user);
      if (result) return result;
      throw new AuthenticationError(
        'Could not log-in with the provided credentials'
      );
    } catch (err) {
      throw err;
    }
  }
}
