import {
  PAYMENT_STRIPE_MODE,
  PAYMENT_CURRENCY
} from './../constants/payment.config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { Product } from '../types/product.type';
import { InjectRepository } from '@nestjs/typeorm';
import { StripeEvent } from './entities/stripe-event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentsService {
  private stripe;
  private STRIPE_SUCCESS_URL;
  private STRIPE_CANCEL_URL;
  private WEBHOOK_SECRET;

  constructor(
    @InjectRepository(StripeEvent)
    private eventRepository: Repository<StripeEvent>,
    congigService: ConfigService
  ) {
    this.stripe = new Stripe(congigService.get<string>('STRIPE_API_KEY'));
    this.STRIPE_SUCCESS_URL = congigService.get<string>('STRIPE_SUCCESS_URL');
    this.STRIPE_CANCEL_URL = congigService.get<string>('STRIPE_CANCEL_URL');
    this.WEBHOOK_SECRET = congigService.get<string>('STRIPE_WEBHOOK_SECRET');
  }

  public async constructEventFromPayload(signature: string, payload: Buffer) {
    return this.stripe.webhooks.constructEvent(
      payload,
      signature,
      this.WEBHOOK_SECRET
    );
  }

  async createEvent(id: string) {
    return await this.eventRepository.insert({ id });
  }

  async createStripeSession(products: Product[]) {
    return await this.stripe.checkout.sessions.create({
      line_items: this.createLineItems(products),
      mode: PAYMENT_STRIPE_MODE,
      success_url: this.STRIPE_SUCCESS_URL,
      cancel_url: this.STRIPE_CANCEL_URL
    });
  }

  private createLineItems(products: Product[]) {
    return products.map((product) => {
      return {
        price_data: {
          currency: PAYMENT_CURRENCY,
          unit_amount: product.price,
          product_data: {
            name: product.title,
            description: product.title
          }
        },
        quantity: 1
      };
    });
  }
}
