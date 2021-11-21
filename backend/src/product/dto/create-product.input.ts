import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field(() => Int)
  categoryId: number;

  @Field({ nullable: true })
  desc?: string;

  @IsNumber()
  @Field(() => Float)
  price: number;

  @Field({ nullable: true })
  picURL?: string;
}
