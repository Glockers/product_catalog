import { Role } from '@app/common/constants';
import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('users')
@Directive('@key(fields: "id")')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'text' })
  login: string;

  @Field()
  @Column({ type: 'text' })
  password: string;

  @Column({ default: Role.User, type: 'text' })
  role: Role;
}
