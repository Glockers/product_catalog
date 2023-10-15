import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { SignUpInput } from './dto/auth.input';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthenticationError } from '@nestjs/apollo';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  // @Query('login')
  // async login(@Args('user') user: LoginUserInput): Promise<Tokens> {
  //   try {
  //     const result = await this.authService.login(user);
  //     if (result) return result;
  //     throw new AuthenticationError(
  //       'Could not log-in with the provided credentials'
  //     );
  //   } catch (err) {
  //     throw err;
  //   }
  // }

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
}
