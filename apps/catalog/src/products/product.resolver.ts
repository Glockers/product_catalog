import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveReference
} from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { JwtAuthGuard, Roles, RolesGuard } from '@app/common/auth';
import { UseFilters, UseGuards } from '@nestjs/common';
import { Role } from '@app/common/constants';
import { HttpExceptionFilter } from '@app/common/filters';
import { LoggerService } from '@app/common/logger/logger.service';

@Resolver(() => Product)
@UseFilters(HttpExceptionFilter)
export class ProductResolver {
  constructor(
    private readonly logger: LoggerService,
    private readonly productService: ProductService
  ) {}

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') { ...createProductInput }: CreateProductInput
  ) {
    const result = this.productService.create(createProductInput);
    this.logger.log('Product created successfully', 'ProductResolver');
    return result;
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Product)
  async removeProduct(@Args('id', { type: () => Int }) id: number) {
    const result = await this.productService.remove(id);
    this.logger.log('Product removed successfully', 'ProductResolver');
    return result;
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Product, { name: 'updateProduct' })
  updateCatalog(
    @Args('updateProduct')
    { ...updateCatalogInput }: UpdateProductInput
  ) {
    const { id, ...data } = updateCatalogInput;
    const result = this.productService.update(id, data);
    this.logger.log('Product updated successfully', 'ProductResolver');
    return result;
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Query(() => [Product], { name: 'products' })
  findAll() {
    return this.productService.find();
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Query(() => Product, { name: 'product' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.productService.findOne(id);
  }

  @ResolveReference()
  async resolveReference(referance: {
    __typename: string;
    id: number;
  }): Promise<Product> {
    return await this.productService.findOne(referance.id);
  }
}
