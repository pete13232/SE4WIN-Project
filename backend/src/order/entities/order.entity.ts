import {
  ObjectType,
  Field,
  Int,
  Float,
  registerEnumType,
} from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Order_Status {
  AWAITING = 'awaiting',
  PENDING = 'pending',
  SUCCESS = 'success',
  UNSUCCESS = 'unsuccess',
}

registerEnumType(Order_Status, {
  name: 'Order_Status',
});

@Entity()
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  orderID: number;

  @Column()
  @Field(() => Int)
  userID: number;

  @Column()
  @Field(() => Int)
  prodID: number;

  @Column()
  @Field(() => Int)
  prodAmount: number;

  @Column()
  @Field()
  orderTimestamp: Date;

  @Column()
  @Field(() => Float)
  orderPrice: number;

  @Column()
  @Field()
  receiptURL: string;

  @Column({ type: 'enum', enum: Order_Status, default: Order_Status.AWAITING })
  @Field(() => Order_Status)
  orderStatus: Order_Status;
}
