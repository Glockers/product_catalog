import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../../schemas/product.schema';
import { Model } from 'mongoose';
import { ProductUpdatedEvent } from '../impl';

@EventsHandler(ProductUpdatedEvent)
export class ProductUpdatedHandler
  implements IEventHandler<ProductUpdatedEvent>
{
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}

  async handle({ data, productID }: ProductUpdatedEvent) {
    await this.productModel.findOneAndUpdate({ id: productID }, data);
  }
}
