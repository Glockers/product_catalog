import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { IProduct } from './types';
import { GET_PRODUCTS_BY_IDs, GET_PRODUCT_BY_ID } from './constant';

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

    this.basketContainer.push(product);
    return product;
  }

  async getProducts(productsID: number[]) {
    return await lastValueFrom(
      this.productClient.send<IProduct>(GET_PRODUCTS_BY_IDs, {
        ids: productsID
      })
    );
  }
}
