import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  username: string;

  @Column({ length: 500 })
  password: string;

  @Column({ length: 500 })
  firstname: string;

  @Column({ length: 500 })
  lastname: string;

  @Column('text')
  address: string;

  @Column({ length: 10 })
  phoneNumber: string;

  @Column()
  email: string;

  @Column('int')
  roleId: number;

  @Column()
  dateCreated: Date;
}
