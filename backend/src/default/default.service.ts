import { Injectable } from '@nestjs/common';
import { CreateDefaultInput } from './dto/create-default.input';
import { UpdateDefaultInput } from './dto/update-default.input';

@Injectable()
export class DefaultService {
  create(createDefaultInput: CreateDefaultInput) {
    return 'This action adds a new default';
  }

  findAll() {
    return `This action returns all default`;
  }

  findOne(id: number) {
    return `This action returns a #${id} default`;
  }

  update(id: number, updateDefaultInput: UpdateDefaultInput) {
    return `This action updates a #${id} default`;
  }

  remove(id: number) {
    return `This action removes a #${id} default`;
  }
}
