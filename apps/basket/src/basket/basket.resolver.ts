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
import { UserHelper } from '@app/common/helpers';
import { CatalogService } from '../services/product.service';
import { JwtAuthGuard, Roles, RolesGuard } from '@app/common/auth';
import { Role } from '@app/common/constants';
import { UseGuards } from '@nestjs/common';

@Resolver('Basket')
export class BasketResolver {
  constructor(
    private userHelper: UserHelper,
    private readonly basketService: BasketService,
    private readonly catalogService: CatalogService
  ) {}

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('addBasket')
  async create(
    @Cookie(NAME_JWT_COOKIE) jwt: Tokens,
    @Args('input') createBasketInput: CreateBasketInput
  ) {
    const userID = await this.userHelper.getUserID(jwt);
    return await this.basketService.add(userID, createBasketInput.id);
  }

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('popBasket')
  async pop(
    @Cookie(NAME_JWT_COOKIE) jwt: Tokens,
    @Args('input') basketInput: CreateBasketInput
  ) {
    const userID = await this.userHelper.getUserID(jwt);
    return await this.basketService.removeProduct(userID, basketInput.id);
  }

  @Query('getBasket')
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll(@Cookie(NAME_JWT_COOKIE) jwt: Tokens): Promise<Basket> {
    const userID = await this.userHelper.getUserID(jwt);
    const productIds =
      await this.basketService.getProductsFromBasketByUserID(userID);
    return {
      userID: userID,
      productIDs: productIds
    };
  }

  @ResolveField('products')
  async getProducts(@Parent() basket: Basket) {
    return await this.catalogService.getProducts(basket.productIDs);
  }

  @ResolveField('user')
  getUser(@Parent() basket: Basket) {
    return { __typename: 'User', id: basket.userID };
  }
}
