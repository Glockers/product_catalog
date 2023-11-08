import { BasketCommunicationHelper } from '@app/common/microservice';
import { Injectable } from '@nestjs/common';
import { Basket } from '../types';
import { CLEAR_BASKET_BY_ID, GET_BASKET_BY_ID } from '@app/common/endpoints';

@Injectable()
export class BasketService {
  constructor(private readonly basketClient: BasketCommunicationHelper) {}

  async clearUserBasket(userID: number) {
    return await this.basketClient.sentToMicroservice(CLEAR_BASKET_BY_ID, {
      id: userID
    });
  }

  async getUserBasket(userID: number) {
    return await this.basketClient.sentToMicroservice<Basket>(
      GET_BASKET_BY_ID,
      {
        id: userID
      }
    );
  }
}
