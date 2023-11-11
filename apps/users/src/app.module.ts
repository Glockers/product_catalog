import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig
} from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/typeorm.config';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigValidationSchemas } from './schemas';
import { AuthModule } from './auth/auth.module';
import { RmqModule } from '@app/common/rmq';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/users/.env',
      validationSchema: ConfigValidationSchemas
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => dataSourceOptions
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      context: ({ req, res }) => ({ req, res }),
      autoSchemaFile: {
        federation: 2
      }
    }),
    UsersModule,
    AuthModule,
    RmqModule
  ]
})
export class AppModule {}
