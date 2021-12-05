import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';
import { PaginatedCategory } from './pagination/PaginatedCategory';

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
    //Create new category instance

    const newCategory = this.categoryRepository.create(createCategoryInput);

    //Save to database
    return this.categoryRepository.save(newCategory);
  }

  /**
   * Show All Products
   *
   * return: List of products
   */
  async findAll(): Promise<Category[]> {
    // const limit = 6;
    // const offset = (page - 1) * limit;

    // const categories = await this.categoryRepository.findAndCount({
    //   order: { name: 'ASC' },
    //   skip: offset,
    //   take: limit,
    // });

    // const paginated = new PaginatedCategory();
    // paginated.data = categories[0];
    // paginated.totalCount = categories[1];
    // paginated.hasNextPage = this.checkNextPage(
    //   paginated.totalCount,
    //   offset,
    //   limit,
    // );

    // return paginated;
    const result = await this.categoryRepository.find({
      order: { id: 'ASC', updatedAt: 'DESC', createdAt: 'DESC' },
    });

    return result;
  }

  /**
   * Show All Products
   *
   * return: List of products
   */
  async AdminFindAll(): Promise<Category[]> {
    const result = await this.categoryRepository.find({
      order: { id: 'ASC', updatedAt: 'DESC', createdAt: 'DESC' },
    });

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

  /**
   * Count Quantity of Category in Database
   *
   * return: Quantity of Product in Database
   */
  async countCategory() {
    return await this.categoryRepository.count();
  }
  
  /**
   * Check if next page available
   *
   * return: boolean
   */
  checkNextPage(count: number, offset: number, limit: number): boolean {
    return offset == 0 ? count > 6 : count % (offset + limit) < count;
  }
}
