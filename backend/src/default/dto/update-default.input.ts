import { CreateDefaultInput } from './create-default.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDefaultInput extends PartialType(CreateDefaultInput) {
  @Field(() => Int)
  id: number;
}
