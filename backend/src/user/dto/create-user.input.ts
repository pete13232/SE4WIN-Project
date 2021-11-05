import { InputType, Field } from '@nestjs/graphql';
import {
  IsAlpha,
  IsAlphanumeric,
  IsEmail,
  IsNumberString,
} from 'class-validator';
import { Role } from '../entities/user.entity';

@InputType()
export class CreateUserInput {
  @IsAlphanumeric()
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

  @IsEmail()
  @Field()
  email: string;

  @Field(() => Role)
  role: Role;
}
