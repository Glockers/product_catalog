import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ENV_PATH } from './products/constants';
import { ConfigValidationSchemas } from './products/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig
} from '@nestjs/apollo';
import { dataSourceOptions } from '../db/writable-database.config';
import { ProductModule } from './products/product.module';
import { MongooseModule } from '@nestjs/mongoose';

const TODO =
  'mongodb+srv://glockers:tester228@cluster0.b684ohp.mongodb.net/?retryWrites=true&w=majority';
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
    MongooseModule.forRoot(TODO),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2
      }
    })
  ]
})
export class AppModule {}
