import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from '../impl/create-product.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { Repository } from 'typeorm';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  async execute(createProductCommand: CreateProductCommand): Promise<void> {
    const { createProductInput } = createProductCommand;
    await this.productRepository.save(createProductInput);
  }

  // TODO
  async sendEvent() {}
}
