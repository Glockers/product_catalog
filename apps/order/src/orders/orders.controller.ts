import {
  Headers,
  Req,
  Controller,
  Post,
  BadRequestException
} from '@nestjs/common';
import { OrderService } from './orders.service';
import { PaymentsService } from '../payment/payments.service';
import { Basket, RequestWithRawBody } from '../types';

@Controller()
export class OrdersController {
  constructor(
    private readonly orderService: OrderService,
    private readonly paymentsService: PaymentsService
  ) {}

  @Post('stripe_webhook')
  async handleIncomingEvents(
    @Headers('stripe-signature') signature: string,
    @Req() request: RequestWithRawBody
  ) {
    if (!signature) {
      throw new BadRequestException('Missing stripe-signature header');
    }

    const event = await this.paymentsService.constructEventFromPayload(
      signature,
      request.rawBody
    );

    if (event.type === 'checkout.session.completed') {
      const data = event.data.object as Basket;
      await this.orderService.createOrder(event, data);
    }
  }
}
