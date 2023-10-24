import { IProduct } from './product.interface';

export type UpdatedProduct = Partial<Omit<IProduct, 'id'>>;
