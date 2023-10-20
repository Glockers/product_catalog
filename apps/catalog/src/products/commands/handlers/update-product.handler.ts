import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { Repository } from 'typeorm';
import { UpdateProductCommand } from '../impl/update-product.command';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler
  implements ICommandHandler<UpdateProductCommand>
{
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  async execute(updateProductCommand: UpdateProductCommand): Promise<void> {
    const { productID, data } = updateProductCommand;
    await this.productRepository.update({ id: productID }, { ...data });
  }

  // TODO
  async sendEvent() {}
}
