import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { Order_Status } from '../entities/order.entity';

@InputType()
export class CreateOrderInput {
  @Field(() => Int)
  userID: number;

  @Field(() => Int)
  prodID: number;

  @Field(() => Int)
  prodAmount: number;

  @Field()
  timestamp: Date;

  @Field(() => Float)
  price: number;

  @Field()
  receiptURL: string;

  @Field()
  status: Order_Status;
}
