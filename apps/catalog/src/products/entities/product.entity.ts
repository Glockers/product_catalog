import { ObjectType, Field, Directive, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IProduct } from '../types/product.interface';

@ObjectType()
@Entity('products')
@Directive('@key(fields: "id")')
export class Product implements IProduct {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'text' })
  title: string;

  @Field()
  @Column({ type: 'text' })
  description: string;
}
