import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BasketService } from './basket.service';
import { CreateBasketInput } from './dto/create-basket.input';

@Resolver('Basket')
export class BasketResolver {
  constructor(private readonly basketService: BasketService) {}
  @Mutation('createBasket')
  create(@Args('createBasketInput') createBasketInput: CreateBasketInput) {
    return this.basketService.create(createBasketInput);
  }

  @Query('basket')
  findAll() {
    return this.basketService.findAll();
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
}
