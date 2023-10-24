import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProductCreatedEvent } from '../impl/product-created.event';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../../entities/product.schema';
import { Model } from 'mongoose';

@EventsHandler(ProductCreatedEvent)
export class ProductCreatedHandler
  implements IEventHandler<ProductCreatedEvent>
{
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}

  async handle({ product }: ProductCreatedEvent) {
    const createdProductModel = new this.productModel(product);

    await createdProductModel.save();
  }
}
