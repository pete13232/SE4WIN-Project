import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  /**
   *
   * Inject to database repository
   *
   */
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  /**
   * Create Category
   *
   * parameter: createCategoryInput
   * return: Created Category
   */
  async create(createCategoryInput: CreateCategoryInput): Promise<Category> {
    //Check if category is already exists
    const category = await this.categoryRepository.findOne({
      name: createCategoryInput.name,
    });
    if (category) {
      throw new ForbiddenError('Category already existed.');
    }

    //Create a new category instance
    const newCategory = this.categoryRepository.create(createCategoryInput);

    //Save to database
    return this.categoryRepository.save(newCategory);
  }

  /**
   * Show All Products
   *
   * parameter: page
   * return: List of products
   */
  async findAll(page: number): Promise<[Category[], number]> {
    const result = await this.categoryRepository.findAndCount({
      order: { name: 'ASC' },
      skip: page * 6,
      take: 6,
    });
    console.log(result);

    return result;
  }
  /**
   * Show All Products
   *
   * parameter: page
   * return: List of products
   */
  async AdminFindAll(): Promise<Category[]> {
    const result = await this.categoryRepository.find({
      order: { name: 'ASC' },
    });
    console.log(result);

    return result;
  }

  /**
   * Find Category by Id
   *
   * parameter: id
   * return: Category
   */
  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOneOrFail(id);
    if (!category) {
      throw new ForbiddenError('Category not found.');
    }
    return category;
  }

  /**
   * Update Category Information
   *
   * parameter: id, updateCategoryInput
   * return: Updated Category
   */
  async update(
    id: number,
    updateCategoryInput: UpdateCategoryInput,
  ): Promise<Category> {
    //Check if category is not exists
    const category = await this.findOne(id);

    //Copy update infomation to current infomation
    const updatedCategory = Object.assign(category, updateCategoryInput);

    //Save to database
    return await this.categoryRepository.save(updatedCategory);
  }

  /**
   * Remove Category
   *
   * parameter: id
   * return: Success Message
   */
  async remove(id: number): Promise<string> {
    await this.categoryRepository.delete(id);
    return 'Delete success';
  }
}
