import { Injectable } from '@nestjs/common';
import { CreateBasketInput } from './dto/create-basket.input';
import { UpdateBasketInput } from './dto/update-basket.input';

@Injectable()
export class BasketService {
  constructor() {}

  create(createBasketInput: CreateBasketInput) {
    console.log(createBasketInput);
    return {
      id: 1,
      title: 'test',
      description: 'test description'
    };
  }

  findAll() {
    return {
      user: {
        id: 1,
        login: 'test'
      },
      products: [
        {
          id: 1,
          title: 'test',
          description: 'test description'
        },
        {
          id: 2,
          title: 'test2',
          description: 'test description234'
        }
      ]
    };
  }

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
