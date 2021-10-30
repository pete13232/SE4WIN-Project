import { ObjectType, Field, Int } from '@nestjs/graphql';
import { type } from 'os';
import { Column, Double, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

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
  orderTimestamp: Timestamp;

  @Column()
  @Field(type => Double)
  orderPrice: number;

  @Column()
  @Field()
  receiptURL: string;

  @Column('int')
  @Field(type => Int)
  orderStatus: Order_Status;
}
