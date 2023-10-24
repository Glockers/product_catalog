import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { Product } from './entities/product.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductCommand } from './commands/impl/create-product.command';
import { ProductsQuery } from './queries/impl/products.query';
import { UpdateProductCommand } from './commands/impl/update-product.command';
import { DeleteProductCommand } from './commands/impl/delete-product.command';
import { ProductByIdQuery } from './queries/impl';
import { UpdatedProduct } from './types/product.type';

@Injectable()
export class ProductService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  create(createCatalogInput: CreateProductInput) {
    return this.commandBus.execute(
      new CreateProductCommand(createCatalogInput)
    );
  }

  async find() {
    return await this.queryBus.execute<ProductsQuery, Product[]>(
      new ProductsQuery()
    );
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.queryBus.execute<ProductByIdQuery, Product>(
      new ProductByIdQuery(id)
    );

    if (!product) throw new Error('Product not found');

    return product;
  }

  async remove(id: number) {
    return await this.commandBus.execute(new DeleteProductCommand(id));
  }

  async update(id: number, data: UpdatedProduct) {
    return await this.commandBus.execute(new UpdateProductCommand(id, data));
  }
}
