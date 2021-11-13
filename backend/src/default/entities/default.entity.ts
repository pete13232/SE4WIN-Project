import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Default {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
