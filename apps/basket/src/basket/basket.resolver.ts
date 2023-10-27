import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BasketService } from './basket.service';
import { CreateBasketInput } from './dto/create-basket.input';
import { IProduct } from './types';

@Resolver('Basket')
export class BasketResolver {
  constructor(private readonly basketService: BasketService) {}

  @Mutation('addBasket')
  create(@Args('input') createBasketInput: CreateBasketInput): IProduct {
    this.basketService.create();
    return {
      id: createBasketInput.id,
      title: 'test',
      description: 'test description'
    };
  }

  @Query('getBasket')
  async findAll() {
    return {
      id: 1,
      products: [
        {
          id: 1,
          title: 'test',
          description: 'test'
        }
      ]
    };
  }
  // @Query('basket')
  // findOne(@Args('id') id: number) {
  //   return this.basketService.findOne(id);
  // }

  // @Mutation('updateBasket')
  // update(@Args('updateBasketInput') updateBasketInput: UpdateBasketInput) {
  //   return this.basketService.update(updateBasketInput.id, updateBasketInput);
  // }

  // @Mutation('removeBasket')
  // remove(@Args('id') id: number) {
  //   return this.basketService.remove(id);
  // }

  // @ResolveField('products')
  // getProduct(@Parent() basket: Basket): IProduct[] {
  //   console.log(basket);
  //   return [
  //     {
  //       id: 1,
  //       description: 'test2 desc',
  //       title: 'test'
  //     }
  //   ];
  // }
}
