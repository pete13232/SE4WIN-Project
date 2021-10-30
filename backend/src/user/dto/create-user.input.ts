import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  username: string;
  @Field()
  password: string;
  @Field()
  firstname: string;
  @Field()
  lastname: string;
  @Field()
  address: string;
  @Field()
  phoneNumber: string;
  @Field()
  email: string;
  @Field(() => Int)
  roleId: number;
}
