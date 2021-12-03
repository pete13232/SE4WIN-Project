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
   * Inject a Product Service
   *
   * parameter: productService
   */
  constructor(private readonly productService: ProductService) {}

  /**
   * Create a Product
   *
   * requires: Signed In with Admin Role
   * parameter: createProductInput
   * return: a Created Product
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
   * Show all Products
   *
   * return: List of Products
   */
  @Query(() => [Product], { name: 'products' })
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  /**
   * Find Product by Id
   *
   * parameter: id
   * return: Product
   */
  @Query(() => Product, { name: 'product' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  /**
   * Find Quantity of a Product in Stock
   *
   * parameters: product
   * return: Quantity of a Product in Stock
   */
  @ResolveField(() => Int)
  stock(@Parent() product: Product): Promise<number> {
    return this.productService.countStock(product.id);
  }

  /**
   *
   * Find Product by name
   *
   * parameters: productName
   * return: product
   */
  @Query(() => Product, { name: 'findProductName' })
  findByName(
    @Args('name', { type: () => String }) name: string,
  ): Promise<Product> {
    return this.productService.findByName(name);
  }

  /**
   * Update Quantity of a Product in Stock
   *
   * requires: Signed In with Admin Role
   * parameters: user ,productId ,quantity
   * return: The Updated Quantity in Stock
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
   * Update a Product Information
   *
   * requires: Signed In with Admin Role
   * parameters: updateProductInput
   * return: The Updated Product
   */
  @Mutation(() => Product)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    return this.productService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }

  /**
   * Remove a Product
   *
   * requires: Signed In with Admin Role
   * parameter: id
   * return: a Success Message
   */
  @Mutation(() => String)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  removeProduct(@Args('id', { type: () => Int }) id: number): Promise<string> {
    return this.productService.remove(id);
  }
}
