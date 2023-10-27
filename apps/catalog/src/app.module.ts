import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ENV_PATH } from './common/constants';
import { ConfigValidationSchemas } from './common/schemas';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig
} from '@nestjs/apollo';
import { dataSourceOptions } from '../db/writable-database.config';
import { ProductModule } from './products/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RmqModule } from '@app/common/rmq/rmq.module';

@Module({
  imports: [
    RmqModule,
    ProductModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ENV_PATH,
      validationSchema: ConfigValidationSchemas
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => dataSourceOptions
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI')
      }),
      inject: [ConfigService]
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
