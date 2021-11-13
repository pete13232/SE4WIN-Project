import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateDefaultInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
