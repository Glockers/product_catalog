import { CreateBasketInput } from './create-basket.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateBasketInput extends PartialType(CreateBasketInput) {
  id: number;
}
