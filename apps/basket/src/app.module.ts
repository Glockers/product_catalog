import { Module } from '@nestjs/common';
import { BasketModule } from './basket/basket.module';
import { ConfigModule } from '@nestjs/config';
import { ENV_PATH } from './common/constants';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig
} from '@nestjs/apollo';
import { RmqModule } from '@app/common/rmq/rmq.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ENV_PATH
      // validationSchema: ConfigValidationSchemas
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['./**/basket.graphql'],
      context: ({ req, res }) => ({ req, res })
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => dataSourceOptions
    }),
    RmqModule,
    BasketModule
  ]
})
export class AppModule {}
