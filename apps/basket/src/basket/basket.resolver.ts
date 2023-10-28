import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent
} from '@nestjs/graphql';
import { BasketService } from './basket.service';
import { CreateBasketInput } from './dto/create-basket.input';
import { Basket } from './entities/basket.entity';
import { IProduct } from './types';

@Resolver('Basket')
export class BasketResolver {
  constructor(private readonly basketService: BasketService) {}

  @Mutation('addBasket')
  async create(@Args('input') createBasketInput: CreateBasketInput) {
    return await this.basketService.add(createBasketInput.id);
  }

  @Query('getBasket')
  async findAll() {
    return {
      id: 5,
      productID: 36
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

  @ResolveField('products')
  getProduct(@Parent() basket: Basket) {
    console.log(basket);
    return { __typename: 'Product', id: basket.productID };
  }
}
