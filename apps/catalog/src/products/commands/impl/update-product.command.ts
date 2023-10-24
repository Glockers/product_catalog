import { UpdatedProduct } from '../../types/product.type';

export class UpdateProductCommand {
  constructor(
    public readonly productID: number,
    public readonly data: UpdatedProduct
  ) {}
}
