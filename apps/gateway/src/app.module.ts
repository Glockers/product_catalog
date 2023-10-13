import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {},
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'auth', url: 'http://localhost:3001/graphql' },
            { name: 'catalog', url: 'http://localhost:3002/graphql' }
            // { name: 'basket', url: 'http://post-service/graphql' },
            // { name: 'order', url: 'http://post-service/graphql' },
          ]
        })
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
