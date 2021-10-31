import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenError } from 'apollo-server-errors';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private categoryService: CategoryService,
  ) {}
  async create(createProductInput: CreateProductInput): Promise<Product> {
    const product = await this.productRepository.findOne({
      name: createProductInput.name,
    });
    if (product) {
      throw new ForbiddenError('Product already existed.');
    }

    const newProduct = this.productRepository.create(createProductInput);

    const category = await this.categoryRepository.findOne({
      where: { id: createProductInput.categoryId },
      relations: ['product'],
    });
    category.product.push(newProduct);

    await this.productRepository.save(newProduct);
    await this.categoryRepository.save(category);

    return newProduct;
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    return await this.productRepository.findOneOrFail(id);
  }

  async update(
    id: number,
    updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new ForbiddenError('Product not found.');
    }
    const updated = Object.assign(product, updateProductInput);
    return await this.productRepository.save(updated);
  }

  async remove(id: number): Promise<string> {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new ForbiddenError('Product not found.');
    }
    await this.productRepository.delete(id);
    return 'Delete success!';
  }
}
