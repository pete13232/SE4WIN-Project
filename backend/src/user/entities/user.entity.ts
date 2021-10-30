import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ length: 500 })
  @Field()
  username: string;

  @Column({ length: 500 })
  @Field()
  password: string;

  @Column({ length: 500 })
  @Field()
  firstname: string;

  @Column({ length: 500 })
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

  @Column('int')
  @Field(() => Int)
  roleId: number;

  // @Column()
  // @Field()
  // dateCreated: Date;
}
