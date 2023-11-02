import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('basket')
export class Basket {
  @Column()
  @PrimaryColumn()
  userID: number;

  @Column('int', { array: true })
  productIDs: number[];
}
