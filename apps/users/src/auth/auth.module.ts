import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolvers';
import { UsersResolver } from '../users/users.resolver';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AtStrategy } from './strategies';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Module({
  imports: [UsersModule, PassportModule.register({ session: true }), JwtModule],
  providers: [
    AuthResolver,
    AuthService,
    UsersResolver,
    AtStrategy,
    TokenService
  ]
})
export class AuthModule {}
