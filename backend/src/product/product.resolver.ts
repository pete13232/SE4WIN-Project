import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { DeleteResult } from 'typeorm';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    return this.productService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'products' })
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    return this.productService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @Mutation(() => DeleteResult.toString)
  removeProduct(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<DeleteResult> {
    return this.productService.remove(id);
  }
}
