import { Field, InputType } from '@nestjs/graphql';

@InputType()
class LoginUserInput {
  @Field()
  readonly email?: string;

  @Field()
  readonly password?: string;
}
export default LoginUserInput;
