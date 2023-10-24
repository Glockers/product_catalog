import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IProduct } from '../types/product.interface';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product implements IProduct {
  @Prop()
  id: number;

  @Prop()
  title: string;

  @Prop()
  description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
