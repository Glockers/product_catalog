import { InputType, ID, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;
}
