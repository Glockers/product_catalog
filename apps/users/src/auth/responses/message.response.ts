import { HttpStatus } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MessageResponse {
  @Field(() => Int)
  status: HttpStatus;

  @Field()
  message: string;
}
