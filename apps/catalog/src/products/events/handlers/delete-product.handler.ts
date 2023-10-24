import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProductDeletedByIdEvent } from '../impl/product-deleted.event';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../../entities/product.schema';
import { Model } from 'mongoose';

@EventsHandler(ProductDeletedByIdEvent)
export class ProductDeleteHandler
  implements IEventHandler<ProductDeletedByIdEvent>
{
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}

  async handle({ productID }: ProductDeletedByIdEvent) {
    return await this.productModel.deleteOne({ id: productID });
  }
}
