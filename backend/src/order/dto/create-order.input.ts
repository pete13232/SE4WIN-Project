import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { Order_Status } from '../entities/order.entity';

@InputType()
export class CreateOrderInput {
  @Field((type) => Int)
  orderID: number;

  @Field((type) => Int)
  userID: number;

  @Field((type) => Int)
  prodID: number;

  @Field((type) => Int)
  prodAmount: number;

  @Field()
  orderTimestamp: Date;

  @Field((type) => Float)
  orderPrice: number;

  @Field()
  receiptURL: string;

  @Field()
  orderStatus: Order_Status;
}
