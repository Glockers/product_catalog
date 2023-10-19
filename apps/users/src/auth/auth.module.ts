import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolvers';
import { UsersResolver } from '../users/users.resolver';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AtStrategy } from './strategies';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthSession } from './entities/auth.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthSession]),
    UsersModule,
    PassportModule.register({ session: true }),
    JwtModule
  ],
  providers: [
    AuthResolver,
    AuthService,
    UsersResolver,
    AtStrategy,
    TokenService
  ]
})
export class AuthModule {}
