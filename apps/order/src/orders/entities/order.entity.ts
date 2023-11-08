import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userID: number;

  @Column('int', { array: true })
  productsID: number[];

  @Column({ type: 'timestamptz' })
  dateBuy: Date;
}
