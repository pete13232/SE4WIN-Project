import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderStatus } from '../enums/order-status.enum';

@Entity()
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => User, (user) => user.order)
  @Field(() => User)
  user: User;

  @ManyToOne(() => Product, (product) => product.order)
  @Field(() => Product)
  product: Product;

  @Column()
  @Field(() => Int)
  quantity: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  orderAddress?: string;

  @Column('float')
  @Field(() => Float)
  netPrice: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  receiptURL?: string;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.AWAITING })
  @Field(() => OrderStatus)
  status: OrderStatus;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
