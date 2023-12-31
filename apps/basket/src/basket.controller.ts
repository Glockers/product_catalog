import { Controller, Get } from '@nestjs/common';
import { BasketService } from './basket.service';

@Controller()
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Get()
  getHello(): string {
    return this.basketService.getHello();
  }
}
