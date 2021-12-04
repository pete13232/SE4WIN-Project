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
  /**
   * Inject Category Service
   *
   * parameter: categoryService
   */
  constructor(private readonly categoryService: CategoryService) {}

  /**
   * Create Category
   *
   * requires: Signed In with Admin Role
   * parameter: createCategoryInput
   * return: Created Category
   */
  @Mutation(() => Category)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ): Promise<Category> {
    return this.categoryService.create(createCategoryInput);
  }

  /**
   * Show all Category
   *
   * return: List of Category
   */
  @Query(() => [Category], { name: 'categories' })
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  /**
   * Find Category by Id
   *
   * parameter: id
   * return: Category
   */
  @Query(() => Category, { name: 'category' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  /**
   * Update Category Information
   *
   * requires: Signed In with Admin Role
   * parameter: updateCategoryInput
   * return: Updated Category
   */
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

  /**
   * Remove Product
   *
   * requires: Signed In with Admin Role
   * parameter: id
   * return: Success Message
   */
  @Mutation(() => String)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  removeCategory(@Args('id', { type: () => Int }) id: number): Promise<string> {
    return this.categoryService.remove(id);
  }
}
