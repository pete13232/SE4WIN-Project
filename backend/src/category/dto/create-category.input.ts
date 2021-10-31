import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field(() => Int)
  cateID: number;

  @Field()
  cateName: string;
}
