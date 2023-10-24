import { UpdatedProduct } from '../../types/product.type';

export class ProductUpdatedEvent {
  constructor(
    public readonly productID: number,
    public readonly data: UpdatedProduct
  ) {}
}
