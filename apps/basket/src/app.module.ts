import { Module } from '@nestjs/common';
import { BasketModule } from './basket/basket.module';
import { ConfigModule } from '@nestjs/config';
import { ENV_PATH } from './common/constants';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig
} from '@nestjs/apollo';

@Module({
  imports: [
    BasketModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ENV_PATH
      // validationSchema: ConfigValidationSchemas
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['**/*.graphql']
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
