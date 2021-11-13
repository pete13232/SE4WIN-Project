import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Category } from '../../category/entities/category.entity';
import { Order } from '../../order/entities/order.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => Category, (category) => category.product)
  @Field(() => Category)
  category: Category;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  desc?: string;

  @Column('float')
  @Field(() => Float)
  price: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  picURL?: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @OneToMany(() => Order, (order) => order.product, { eager: true })
  @Field(() => [Order])
  order: Order[];
}
