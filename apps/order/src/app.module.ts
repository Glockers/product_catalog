import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ORDER_TYPE_PATH, PATH_ENV } from './constants';
import { OrderModule } from './orders/orders.module';
import { RmqModule } from '@app/common/rmq';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig
} from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/typeorm.config';
import { ConfigValidationSchemas } from './schemas/main.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: PATH_ENV,
      validationSchema: ConfigValidationSchemas
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: [ORDER_TYPE_PATH],
      context: ({ req, res }) => ({ req, res })
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => dataSourceOptions
    }),
    OrderModule,
    RmqModule
  ]
})
export class AppModule {}
