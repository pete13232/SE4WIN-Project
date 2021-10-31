import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Role {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
}

registerEnumType(Role, {
  name: 'Role',
});

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
  username: string;

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

  @Column()
  @Field()
  email: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.CUSTOMER,
  })
  @Field(() => Role)
  role: Role;

  @CreateDateColumn()
  @Field()
  created_at: Date;

  @UpdateDateColumn()
  @Field()
  updated_at: Date;
}
