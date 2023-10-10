import { InputType, ID, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => ID)
  id: number;

  @Field()
  login: string;

  @Field()
  password: string;
}
