import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export interface IPaginatedType<T> {
  data: T[];
  totalCount: number;
  hasNextPage: boolean;
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field(() => [classRef], { nullable: true })
    data: T[];

    @Field(() => Int)
    totalCount: number;

    @Field()
    hasNextPage: boolean;
  }
  return PaginatedType as Type<IPaginatedType<T>>;
}
