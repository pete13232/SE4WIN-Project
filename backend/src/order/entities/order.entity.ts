import {
  ObjectType,
  Field,
  Int,
  Float,
  registerEnumType,
} from '@nestjs/graphql';
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
  order_address?: string;

  @Column('float')
  @Field(() => Float)
  netPrice: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  receiptURL?: string;

  @Column({ type: 'enum', enum: Order_Status, default: Order_Status.AWAITING })
  @Field(() => Order_Status)
  status: Order_Status;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
