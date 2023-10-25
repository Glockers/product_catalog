import { IProduct } from '../types/product.type';
import { IUser } from '../types/user.type';

export class Basket {
  user: IUser;
  products: IProduct[];
}
