import { Controller, Post } from '@nestjs/common';
import { OrderService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(private readonly orderService: OrderService) {}

  @Post('stripe_webhook')
  async handleIncomingEvents() {}
}
