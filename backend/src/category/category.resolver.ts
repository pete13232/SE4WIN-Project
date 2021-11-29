import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/user/enums/role.enum';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ): Promise<Category> {
    return this.categoryService.create(createCategoryInput);
  }

  @Query(() => [Category], { name: 'categories' })
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Query(() => Category, { name: 'category' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @Mutation(() => Category)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ): Promise<Category> {
    return this.categoryService.update(
      updateCategoryInput.id,
      updateCategoryInput,
    );
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  removeCategory(@Args('id', { type: () => Int }) id: number): Promise<string> {
    return this.categoryService.remove(id);
  }
}
