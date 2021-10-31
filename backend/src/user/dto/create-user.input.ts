import { InputType, Field } from '@nestjs/graphql';
import { Role } from '../entities/user.entity';

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
  @Field(() => Role)
  roleId: Role;
}
