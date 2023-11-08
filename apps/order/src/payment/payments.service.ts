import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { Product } from '../types/product.type';

@Injectable()
export class PaymentsService {
  private stripe;
  private STRIPE_SUCCESS_URL;
  private STRIPE_CANCEL_URL;

  constructor(congigService: ConfigService) {
    this.stripe = new Stripe(congigService.get<string>('STRIPE_API_KEY'));
    this.STRIPE_SUCCESS_URL = congigService.get<string>('STRIPE_SUCCESS_URL');
    this.STRIPE_CANCEL_URL = congigService.get<string>('STRIPE_CANCEL_URL');
  }

  async createStripeSession(products: Product[]) {
    return await this.stripe.checkout.sessions.create({
      line_items: this.createLineItems(products),
      mode: 'payment',
      success_url: this.STRIPE_SUCCESS_URL,
      cancel_url: this.STRIPE_CANCEL_URL
    });
  }

  private createLineItems(products: Product[]) {
    return products.map((product) => {
      return {
        price_data: {
          currency: 'usd',
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
