import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolvers';
import { UsersResolver } from '../users/users.resolver';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [AuthResolver, UsersResolver]
})
export class AuthModule {}
