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
import { JwtAuthGuard, Roles, RolesGuard } from '@app/common/auth';
import { LoggerService, UseFilters, UseGuards } from '@nestjs/common';
import { Role } from '@app/common/constants';
import { HttpExceptionFilter } from '@app/common/filters';

@Resolver('Order')
@UseFilters(HttpExceptionFilter)
export class OrdersResolver {
  constructor(
    private readonly orderService: OrderService,
    private readonly userHelper: UserHelper,
    private readonly catalogService: CatalogService,
    private readonly logger: LoggerService
  ) {}

  @Roles()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation()
  async create_order(@Cookie(NAME_JWT_COOKIE) jwt: Tokens) {
    const userID = await this.userHelper.getUserID(jwt);
    const result = await this.orderService.getStripeSession(userID);
    this.logger.log('Order created successfully', 'OrdersResolver');
    return result;
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Query()
  async orders(@Cookie(NAME_JWT_COOKIE) jwt: Tokens) {
    const userID = await this.userHelper.getUserID(jwt);
    const result = await this.orderService.getOrdersByUserId(userID);
    this.logger.log('Orders retrieved successfully', 'OrdersResolver');
    return result;
  }

  @ResolveField('products')
  async getProducts(@Parent() basket: Basket) {
    try {
      const result = await this.catalogService.getProducts(basket.productIDs);
      this.logger.log('Products retrieved successfully', 'OrdersResolver');
      return result;
    } catch (error) {
      this.logger.error(
        `Error retrieving products: ${error.message}`,
        error.stack,
        'OrdersResolver'
      );
      throw error;
    }
  }
  @ResolveField('user')
  async getUser(@Parent() basket: Basket) {
    return { __typename: 'User', id: basket.userID };
  }
}
