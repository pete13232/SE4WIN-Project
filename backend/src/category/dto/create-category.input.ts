import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field()
  name: string;
}
