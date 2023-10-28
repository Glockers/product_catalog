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

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') { ...createProductInput }: CreateProductInput
  ) {
    return this.productService.create(createProductInput);
  }

  @Mutation(() => Product)
  async removeProduct(@Args('id', { type: () => Int }) id: number) {
    return await this.productService.remove(id);
  }

  @Mutation(() => Product, { name: 'updateProduct' })
  updateCatalog(
    @Args('updateProduct')
    { ...updateCatalogInput }: UpdateProductInput
  ) {
    const { id, ...data } = updateCatalogInput;
    return this.productService.update(id, data);
  }

  @Query(() => [Product], { name: 'products' })
  findAll() {
    return this.productService.find();
  }

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
