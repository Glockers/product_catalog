import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketResolver } from './basket.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Basket } from './entities/basket.entity';
import {
  AuthCommunicationModule,
  CatalogCommunicationModule
} from '@app/common/microservice';
import { UserHelper } from '@app/common/helpers';
import { CatalogService } from '../services/product.service';
import { BasketController } from './basket.controller';

@Module({
  imports: [
    CatalogCommunicationModule,
    TypeOrmModule.forFeature([Basket]),
    AuthCommunicationModule
  ],
  controllers: [BasketController],
  providers: [BasketResolver, BasketService, UserHelper, CatalogService]
})
export class BasketModule {}
