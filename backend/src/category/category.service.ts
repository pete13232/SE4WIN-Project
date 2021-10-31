import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryInput: CreateCategoryInput): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      name: createCategoryInput.name,
    });
    if (category) {
      throw new ForbiddenError('Category already existed.');
    }
    const newCategory = this.categoryRepository.create(createCategoryInput);
    return this.categoryRepository.save(newCategory);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    return this.categoryRepository.findOneOrFail(id);
  }

  async update(id: number, updateCategoryInput: UpdateCategoryInput): Promise<Category> {
    const category = await this.categoryRepository.findOne(id);
    if(!category){
      throw new ForbiddenError('Category does not existed.');
    }
    const updatedCategory = Object.assign(category, updateCategoryInput);
    return await this.categoryRepository.save(updatedCategory);
  }

  async remove(id: number): Promise<string> {
    await this.categoryRepository.delete(id);
    return 'Delete success';
  }
}
