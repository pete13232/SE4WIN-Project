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
    //Check duplicate
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
    const result = await this.categoryRepository.find();
    console.log(result.length);

    return result;
  }

  async findOne(id: number): Promise<Category> {
    return await this.categoryRepository.findOneOrFail(id);
  }

  async update(
    id: number,
    updateCategoryInput: UpdateCategoryInput,
  ): Promise<Category> {
    //Check is it havd in db?
    const category = await this.categoryRepository.findOne(id);
    if (!category) {
      throw new ForbiddenError('Category does not existed.');
    }

    //Copy from update to old one
    const updatedCategory = Object.assign(category, updateCategoryInput);
    return await this.categoryRepository.save(updatedCategory);
  }

  async remove(id: number): Promise<string> {
    await this.categoryRepository.delete(id);
    return 'Delete success';
  }
}
