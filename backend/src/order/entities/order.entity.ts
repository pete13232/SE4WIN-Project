import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum Order_Status {
  awaiting,
  pending,
  success,
  unsuccess
}

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

  @Column()
  @Field(() => Order_Status)
  orderStatus: Order_Status;
}
