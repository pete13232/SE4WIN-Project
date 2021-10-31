import { InputType, Int, Field, Float } from '@nestjs/graphql';

enum Order_Status {
  awaiting,
  pending,
  success,
  unsuccess
}

@InputType()
export class CreateOrderInput {
  @Field(type => Int)
  orderID: number;

  @Field(type => Int)
  userID: number;

  @Field(type => Int)
  prodID: number;

  @Field(type => Int)
  prodAmount: number;

  @Field()
  orderTimestamp: Date;

  @Field(type => Float)
  orderPrice: number;

  @Field()
  receiptURL: string;

  @Field(type => Order_Status)
  orderStatus: Order_Status;
}
