import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignUpInput {
  @Field()
  login: string;

  @Field()
  password: string;
}

@InputType()
export class LoginUserInput {
  @Field()
  login: string;

  @Field()
  password: string;
}
