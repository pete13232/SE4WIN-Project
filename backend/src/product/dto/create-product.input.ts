import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field(() => Int)
  categoryId: number;

  @Field({ nullable: true })
  desc?: string;

  @Field(() => Int)
  price: number;

  @Field({ nullable: true })
  picURL?: string;
}
