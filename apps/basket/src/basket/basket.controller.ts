import { Controller, UseFilters } from '@nestjs/common';
import { BasketService } from './basket.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CLEAR_BASKET_BY_ID, GET_BASKET_BY_ID } from '@app/common/endpoints';
import { HttpExceptionFilter } from '@app/common/filters';

@Controller()
@UseFilters(HttpExceptionFilter)
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @EventPattern(CLEAR_BASKET_BY_ID)
  async clearUserBasket(@Payload('id') userID: number) {
    return await this.basketService.clearBasket(userID);
  }

  @EventPattern(GET_BASKET_BY_ID)
  async getUserBasket(@Payload('id') userID: number) {
    return await this.basketService.getBasketById(userID);
  }
}
