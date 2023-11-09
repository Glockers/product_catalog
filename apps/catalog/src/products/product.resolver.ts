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
import { UseGuards } from '@nestjs/common';
import { Role } from '@app/common/constants';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') { ...createProductInput }: CreateProductInput
  ) {
    return this.productService.create(createProductInput);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Product)
  async removeProduct(@Args('id', { type: () => Int }) id: number) {
    return await this.productService.remove(id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Product, { name: 'updateProduct' })
  updateCatalog(
    @Args('updateProduct')
    { ...updateCatalogInput }: UpdateProductInput
  ) {
    const { id, ...data } = updateCatalogInput;
    return this.productService.update(id, data);
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
