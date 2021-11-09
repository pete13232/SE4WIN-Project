import { InputType, Field } from '@nestjs/graphql';
import { IsAlpha, IsEmail, IsNumberString } from 'class-validator';
import { Role } from '../entities/user.entity';

@InputType()
export class CreateUserInput {
  @IsEmail()
  @Field()
  email: string;

  @Field()
  password: string;

  @IsAlpha()
  @Field()
  firstname: string;

  @IsAlpha()
  @Field()
  lastname: string;

  @Field()
  address: string;

  @IsNumberString()
  @Field()
  phoneNumber: string;

  @Field(() => Role)
  role: Role;
}
