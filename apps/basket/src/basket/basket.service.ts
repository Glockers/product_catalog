import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { IProduct } from './types';
import { GET_PRODUCT_BY_ID } from './constant';

@Injectable()
export class BasketService {
  basketContainer = [];

  constructor(@Inject('CATALOG') private productClient: ClientProxy) {}

  async add(productID: number): Promise<IProduct> {
    const product = await lastValueFrom(
      this.productClient.send<IProduct>(GET_PRODUCT_BY_ID, {
        id: productID
      })
    );

    if (!product) throw new Error('Product not found');
    // Add user id
    this.basketContainer.push(product);
    return product;
  }

  async getBasket(userID: number) {
    return this.basketContainer;
  }

  async popFromBasket(productID: number) {}

  findOne(id: number) {
    return `This action returns a #${id} basket`;
  }
}
