import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { type } from 'os';
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
  @Field(type => Int)
  orderID: number;

  @Column()
  @Field(type => Int)
  userID: number;

  @Column()
  @Field(type => Int)
  prodID: number;

  @Column()
  @Field(type => Int)
  prodAmount: number;

  @Column()
  @Field()
  orderTimestamp: Date;

  @Column()
  @Field(type => Float)
  orderPrice: number;

  @Column()
  @Field()
  receiptURL: string;

  @Column()
  @Field(type => Order_Status)
  orderStatus: Order_Status;
}
