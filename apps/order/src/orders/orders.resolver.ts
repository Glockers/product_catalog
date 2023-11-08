import {
  Resolver,
  Mutation,
  Query,
  ResolveField,
  Parent
} from '@nestjs/graphql';
import { OrderService } from './orders.service';
import { Cookie } from '@app/common/decorator';
import { NAME_JWT_COOKIE } from '@app/common/constants/jwt.constants';
import { Tokens } from '@app/common/types/tokens.type';
import { UserHelper } from '@app/common/helpers';
import { CatalogService } from '../services/catalog.service';
import { Basket } from '../types';

@Resolver('Order')
export class OrdersResolver {
  constructor(
    private readonly orderService: OrderService,
    private readonly userHelper: UserHelper,
    private readonly catalogService: CatalogService
  ) {}

  // Может добавлять все
  @Mutation()
  async create_order(@Cookie(NAME_JWT_COOKIE) jwt: Tokens) {
    const userID = await this.userHelper.getUserID(jwt);
    return await this.orderService.getStripeSession(userID);
  }

  // Может смотерть только админ
  @Query()
  async orders(@Cookie(NAME_JWT_COOKIE) jwt: Tokens) {
    const userID = await this.userHelper.getUserID(jwt);
    return await this.orderService.getOrdersByUserId(userID);
  }

  @ResolveField('products')
  async getProducts(@Parent() basket: Basket) {
    return await this.catalogService.getProducts(basket.productIDs);
  }

  // FIX Field
  @ResolveField('user')
  async getUser(@Parent() basket: Basket) {
    return { __typename: 'User', id: basket.userID };
  }
}
