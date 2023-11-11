import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductsByIdQuery } from '../impl';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../../entities/product.schema';
import { Model } from 'mongoose';

@QueryHandler(ProductsByIdQuery)
export class ProductsByIdsQueryHandler
  implements IQueryHandler<ProductsByIdQuery>
{
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}

  async execute({ productsID }: ProductsByIdQuery) {
    return await this.productModel.find({
      id: {
        $in: productsID
      }
    });
  }
}
