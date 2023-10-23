import { IProduct } from '../../types/product.interface';

type UpdatedProduct = Partial<Omit<IProduct, 'id'>>;

export class ProductUpdatedEvent {
  constructor(
    public readonly productID: number,
    public readonly data: UpdatedProduct
  ) {}
}
