import { Module } from '@nestjs/common';
import { PaymentsModule } from '../payment/paymets.module';
import { OrdersController } from './orders.controller';
import { OrderService } from './orders.service';
import {
  AuthCommunicationModule,
  BasketCommunicationModule,
  CatalogCommunicationModule
} from '@app/common/microservice';
import { UserHelper } from '@app/common/helpers';
import { BasketService } from '../services/basket.service';
import { CatalogService } from '../services/catalog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrdersResolver } from './orders.resolver';

@Module({
  imports: [
    PaymentsModule,
    CatalogCommunicationModule,
    AuthCommunicationModule,
    BasketCommunicationModule,
    TypeOrmModule.forFeature([Order])
  ],
  controllers: [OrdersController],
  providers: [
    OrderService,
    UserHelper,
    BasketService,
    CatalogService,
    OrdersResolver
  ]
})
export class OrderModule {}
