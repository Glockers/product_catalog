import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus
} from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { Repository } from 'typeorm';
import { IEventPublisher } from '../../types';
import { ProductDeletedByIdEvent } from '../../events/impl/product-deleted.event';
import { DeleteProductCommand } from '../impl';
import { ProductByIdQuery } from '../../queries/impl';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler
  implements ICommandHandler<DeleteProductCommand>, IEventPublisher
{
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private readonly eventBus: EventBus,
    private readonly queryBus: QueryBus
  ) {}

  async execute(deleteProductCommand: DeleteProductCommand) {
    const { productID } = deleteProductCommand;
    const product = await this.queryBus.execute<ProductByIdQuery, Product>(
      new ProductByIdQuery(productID)
    );

    if (!product) throw new Error('Product not found');
    const deleteResult = await this.productRepository.delete({
      id: product.id
    });

    if (!deleteResult)
      throw new Error('Ошибка при удалении в модели для записи');
    this.sendEvent(product.id);
    return product;
  }

  async sendEvent(productID: number) {
    this.eventBus.publish(new ProductDeletedByIdEvent(productID));
  }
}
