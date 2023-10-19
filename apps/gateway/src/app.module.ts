import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { GATEWAY_ENV_PATH } from './constants';
import { ConfigValidationSchemas } from './schemas';
import { subgraphsPath } from './constants/subgraphs';
import { GraphQLDataSource } from './graphql-data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: GATEWAY_ENV_PATH,
      validationSchema: ConfigValidationSchemas
    }),
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        context: ({ req, res }) => ({ req, res })
      },
      gateway: {
        buildService: (args) => new GraphQLDataSource(args),
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: subgraphsPath
        })
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
