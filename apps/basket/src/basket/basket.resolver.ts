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
import { Cookie } from '@app/common/decorator';
import { NAME_JWT_COOKIE } from '@app/common/constants/jwt.constants';
import { Tokens } from 'apps/users/src/auth/types';
import { UserHelper } from '../common/helpers';

@Resolver('Basket')
export class BasketResolver {
  constructor(
    private userHelper: UserHelper,
    private readonly basketService: BasketService
  ) {}

  @Mutation('addBasket')
  async create(@Args('input') createBasketInput: CreateBasketInput) {
    const userID = 1;
    return await this.basketService.add(userID, createBasketInput.id);
  }

  @Query('getBasket')
  async findAll(@Cookie(NAME_JWT_COOKIE) jwt: Tokens): Promise<Basket> {
    const userID = await this.userHelper.getUserID(jwt);
    const products = [36, 35, 33];
    return {
      userID: userID,
      productIDs: products
    };
  }

  @ResolveField('products')
  async getProducts(@Parent() basket: Basket) {
    return await this.basketService.getProducts(basket.productIDs);
  }

  @ResolveField('user')
  getUser(@Parent() basket: Basket) {
    return { __typename: 'User', id: basket.userID };
  }
}
