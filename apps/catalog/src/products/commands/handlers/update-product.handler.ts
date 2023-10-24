import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { Repository } from 'typeorm';
import { UpdateProductCommand } from '../impl/update-product.command';
import { ProductUpdatedEvent } from '../../events/impl';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler
  implements ICommandHandler<UpdateProductCommand>
{
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private readonly eventBus: EventBus
  ) {}

  async execute(updateProductCommand: UpdateProductCommand) {
    const { productID, data } = updateProductCommand;
    const updated = await this.productRepository.update(
      { id: productID },
      { ...data }
    );
    await this.sendEvent(productID, data);
    return updated;
  }

  async sendEvent(productID, data) {
    this.eventBus.publish(new ProductUpdatedEvent(productID, data));
  }
}
