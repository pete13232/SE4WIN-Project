import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/user/enums/role.enum';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { User } from 'src/user/entities/user.entity';

@Resolver(() => Product)
export class ProductResolver {
  /**
   * Inject product service
   *
   * @param productService
   */
  constructor(private readonly productService: ProductService) {}

  /**
   * Create product
   *
   * @requires signed in and role admin
   * @param createProductInput
   * @returns Created product
   */
  @Mutation(() => Product)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    return this.productService.create(createProductInput);
  }

  /**
   * Show all product
   *
   * @requires signed in and role admin
   * @returns list of product
   */
  @Query(() => [Product], { name: 'products' })
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  /**
   * Find user by id
   *
   * @param id
   * @returns Product
   */
  @Query(() => Product, { name: 'product' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Product> {
    return this.productService.findOne(id);
  }
  @ResolveField(() => Int)
  stock(@Parent() product: Product): Promise<number> {
    return this.productService.countStock(product.id);
  }

  /**
   * TODO findByName
   * @param productName
   * @returns lsit of product
   */

  @Mutation(() => Int)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  updateStock(
    @CurrentUser() user: User,
    @Args('productId', { type: () => Int }) productId: number,
    @Args('quantity', { type: () => Int }) quantity: number,
  ) {
    return this.productService.updateStock(user.id, productId, quantity);
  }

  /**
   * Update product information
   *
   * @param id
   * @param updateProductInput
   * @returns updated product
   */
  @Mutation(() => Product)
  @UseGuards(GqlAuthGuard)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    return this.productService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }

  /**
   * Remove product
   *
   * @param id
   * @returns success message
   */
  @Mutation(() => String)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  removeProduct(@Args('id', { type: () => Int }) id: number): Promise<string> {
    return this.productService.remove(id);
  }
}
