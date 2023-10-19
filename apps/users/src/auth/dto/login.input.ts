import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class LoginUserInput {
  @Field()
  login: string;

  @Field()
  password: string;
}
