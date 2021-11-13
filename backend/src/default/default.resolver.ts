import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DefaultService } from './default.service';
import { Default } from './entities/default.entity';
import { CreateDefaultInput } from './dto/create-default.input';
import { UpdateDefaultInput } from './dto/update-default.input';

@Resolver(() => Default)
export class DefaultResolver {
  constructor(private readonly defaultService: DefaultService) {}

  @Mutation(() => Default)
  createDefault(@Args('createDefaultInput') createDefaultInput: CreateDefaultInput) {
    return this.defaultService.create(createDefaultInput);
  }

  @Query(() => [Default], { name: 'default' })
  findAll() {
    return this.defaultService.findAll();
  }

  @Query(() => Default, { name: 'default' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.defaultService.findOne(id);
  }

  @Mutation(() => Default)
  updateDefault(@Args('updateDefaultInput') updateDefaultInput: UpdateDefaultInput) {
    return this.defaultService.update(updateDefaultInput.id, updateDefaultInput);
  }

  @Mutation(() => Default)
  removeDefault(@Args('id', { type: () => Int }) id: number) {
    return this.defaultService.remove(id);
  }
}
