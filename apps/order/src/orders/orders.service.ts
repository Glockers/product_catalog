import { BadRequestException, Injectable } from '@nestjs/common';
import { PaymentsService } from '../payment/payments.service';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BasketService } from '../services/basket.service';
import { CatalogService } from '../services/catalog.service';
import Stripe from 'stripe';
import { Basket } from '../types';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private readonly paymentsService: PaymentsService,
    private readonly basketService: BasketService,
    private readonly catalogService: CatalogService
  ) {}

  async createOrder(event: Stripe.Event, order: Basket): Promise<Order> {
    try {
      await this.paymentsService.createEvent(event.id);
    } catch {
      throw new BadRequestException('This event was already processed');
    }
    await this.basketService.clearUserBasket(order.userID);
    return await this.orderRepository.save({
      dateBuy: new Date(),
      productsID: order.productIDs,
      userID: order.userID
    });
  }

  async getStripeSession(userID: number) {
    const basket = await this.basketService.getUserBasket(userID);
    const products = await this.catalogService.getProducts(basket.productIDs);
    return await this.paymentsService.createStripeSession(products);
  }

  async getOrdersByUserId(userID: number) {
    return await this.orderRepository.findBy({
      userID
    });
  }
}
