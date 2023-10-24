import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from '../impl/create-product.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { Repository } from 'typeorm';
import { ProductCreatedEvent } from '../../events/impl/product-created.event';
import { IEventPublisher } from '../../types';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>, IEventPublisher
{
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly eventBus: EventBus
  ) {}

  async execute(createProductCommand: CreateProductCommand) {
    const { createProductInput } = createProductCommand;
    const product = await this.productRepository.save(createProductInput);
    this.sendEvent(product);
    return product;
  }

  async sendEvent(product) {
    this.eventBus.publish(new ProductCreatedEvent(product));
  }
}
