import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class CreateOrderInput {
  @IsNumber()
  @Field(() => Int)
  userId: number;
  @IsNumber()
  @Field(() => Int)
  productId: number;

  @IsNumber()
  @Field(() => Int)
  quantity: number;

  @Field({ nullable: true })
  receiptURL: string;
}
