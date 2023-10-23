import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IProduct } from '../types/product.interface';

@ObjectType()
@Entity('products')
export class Product implements IProduct {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'text' })
  title: string;

  @Field()
  @Column({ type: 'text' })
  description: string;
}
