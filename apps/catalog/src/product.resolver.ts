import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'products' })
  findAll() {
    return this.productService.findAll();
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productService.findOne(id);
  }

  // @Mutation(() => Catalog)
  // updateCatalog(
  //   @Args('updateCatalogInput') updateCatalogInput: UpdateCatalogInput,
  // ) {
  //   return this.catalogService.update(
  //     updateCatalogInput.id,
  //     updateCatalogInput,
  //   );
  // }

  @Mutation(() => Product)
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productService.remove(id);
  }
}
