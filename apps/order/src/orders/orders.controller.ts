import {
  Headers,
  Req,
  Controller,
  Post,
  BadRequestException,
  UseFilters
} from '@nestjs/common';
import { OrderService } from './orders.service';
import { PaymentsService } from '../payment/payments.service';
import { Basket, RequestWithRawBody } from '../types';
import { LoggerService } from '@app/common/logger/logger.service';
import { HttpExceptionFilter } from '@app/common/filters';

@Controller()
@UseFilters(HttpExceptionFilter)
export class OrdersController {
  constructor(
    private readonly orderService: OrderService,
    private readonly paymentsService: PaymentsService,
    private readonly logger: LoggerService
  ) {}

  @Post('stripe_webhook')
  async handleIncomingEvents(
    @Headers('stripe-signature') signature: string,
    @Req() request: RequestWithRawBody
  ) {
    if (!signature) {
      this.logger.error(
        'Missing stripe-signature header',
        '',
        'OrdersController'
      );
      throw new BadRequestException('Missing stripe-signature header');
    }

    const event = await this.paymentsService.constructEventFromPayload(
      signature,
      request.rawBody
    );

    if (event.type === 'checkout.session.completed') {
      const data = event.data.object as Basket;
      await this.orderService.createOrder(event, data);
      this.logger.log('Order created successfully', 'OrdersController');
    }
  }
}
