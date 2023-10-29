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

@Resolver('Basket')
export class BasketResolver {
  constructor(private readonly basketService: BasketService) {}

  @Mutation('addBasket')
  async create(@Args('input') createBasketInput: CreateBasketInput) {
    return await this.basketService.add(createBasketInput.id);
  }

  @Query('getBasket')
  async findAll(): Promise<Basket> {
    return {
      userID: 1,
      productsID: [36, 35, 34]
    };
  }

  @ResolveField('products')
  getProduct(@Parent() basket: Basket) {
    console.log('product resolver', basket.productsID);
    return this.basketService.getProducts(basket.productsID);
  }

  @ResolveField('user')
  getUser(@Parent() basket: Basket) {
    console.log('user resolver', basket.userID);
    return { __typename: 'User', id: basket.userID };
  }
}
