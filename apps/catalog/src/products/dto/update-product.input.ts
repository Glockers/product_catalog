import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput {
  @Field()
  id: number;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description: string;
}
