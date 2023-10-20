import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { Repository } from 'typeorm';
import { DeleteProductCommand } from '../impl/delete-product.command';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler
  implements ICommandHandler<DeleteProductCommand>
{
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  async execute(deleteProductCommand: DeleteProductCommand): Promise<void> {
    const { productID } = deleteProductCommand;
    await this.productRepository.delete({ id: productID });
  }

  // TODO
  async sendEvent() {}
}
