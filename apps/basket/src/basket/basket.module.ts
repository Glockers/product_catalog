import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketResolver } from './basket.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Basket } from './entities/basket.entity';
import {
  AuthCommunicationModule,
  CatalogCommunicationModule
} from '@app/common/microservice';
import { UserHelper } from '../common/helpers';

@Module({
  imports: [
    CatalogCommunicationModule,
    TypeOrmModule.forFeature([Basket]),
    AuthCommunicationModule
  ],
  providers: [BasketResolver, BasketService, UserHelper]
})
export class BasketModule {}
