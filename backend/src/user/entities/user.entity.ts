import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Order } from 'src/order/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../enums/role.enum';

@Entity()
@ObjectType()
export class User {
  // TODO change to uuid in future
  // @PrimaryGeneratedColumn('uuid')
  // @Field()
  // id: string;
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column()
  @Field()
  firstname: string;

  @Column()
  @Field()
  lastname: string;

  @Column('text')
  @Field()
  address: string;

  @Column({ length: 10 })
  @Field()
  phoneNumber: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.CUSTOMER,
  })
  @Field(() => Role)
  role: Role;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @OneToMany(() => Order, (order) => order.user, { eager: true })
  @Field(() => [Order])
  order: Order[];
}
