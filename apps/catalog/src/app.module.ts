import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ENV_PATH } from './products/constants';
import { ConfigValidationSchemas } from './products/schemas';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig
} from '@nestjs/apollo';
import { dataSourceOptions } from '../db/typeorm.config';
import { ProductModule } from './products/product.module';

@Module({
  imports: [
    ProductModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ENV_PATH,
      validationSchema: ConfigValidationSchemas
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => dataSourceOptions
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2
      }
    })
  ]
})
export class AppModule {}
