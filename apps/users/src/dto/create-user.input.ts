import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  id: number;

  @Field()
  login: string;

  @Field()
  password: string;
}
