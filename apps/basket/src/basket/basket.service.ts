import { Inject, Injectable } from '@nestjs/common';
import { UpdateBasketInput } from './dto/update-basket.input';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { IProduct } from './types';

@Injectable()
export class BasketService {
  constructor(@Inject('CATALOG') private productClient: ClientProxy) {}

  async add(productID: number): Promise<IProduct> {
    const product = await lastValueFrom(
      this.productClient.send<IProduct>('product/getProductById', {
        id: productID
      })
    );

    if (!product) throw new Error('Product not found');
    return product;
  }

  async create() {
    console.log(
      await lastValueFrom(
        this.productClient.send('product/getProductById', { id: 1 })
      )
    );
    return {
      id: 1,
      title: 'test',
      description: 'test description'
    };
  }

  // findAll() {
  //   return {
  //     user: {
  //       id: 1,
  //       login: 'test'
  //     },
  //     products: [
  //       {
  //         id: 1,
  //         title: 'test',
  //         description: 'test description'
  //       },
  //       {
  //         id: 2,
  //         title: 'test2',
  //         description: 'test description234'
  //       }
  //     ]
  //   };
  // }

  findOne(id: number) {
    return `This action returns a #${id} basket`;
  }

  update(id: number, updateBasketInput: UpdateBasketInput) {
    console.log(updateBasketInput);
    return `This action updates a #${id} basket`;
  }

  remove(id: number) {
    return `This action removes a #${id} basket`;
  }
}
