import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductByIdQuery } from '../impl';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../../entities/product.schema';
import { Model } from 'mongoose';

@QueryHandler(ProductByIdQuery)
export class ProductByIdQueryHandler
  implements IQueryHandler<ProductByIdQuery>
{
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}

  async execute({ productID }: ProductByIdQuery) {
    return await this.productModel.findOne({ id: productID });
  }
}
