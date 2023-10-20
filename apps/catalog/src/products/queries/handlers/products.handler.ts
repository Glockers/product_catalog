import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductsQuery } from '../impl/products.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { Repository } from 'typeorm';

@QueryHandler(ProductsQuery)
export class CampersHandler implements IQueryHandler<ProductsQuery> {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  async execute() {
    return await this.productRepository.find();
  }
}
