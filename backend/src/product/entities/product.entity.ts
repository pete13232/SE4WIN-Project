import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Category } from 'src/category/entities/category.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => Category, (category) => category.product)
  category: Category;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  desc?: string;

  @Column('int')
  @Field(() => Int)
  price: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  picURL?: string;
}
