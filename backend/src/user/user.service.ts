import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenError } from 'apollo-server-errors';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = await this.userRepository.findOne({
      email: createUserInput.email,
    });
    if (user) {
      throw new ForbiddenError('User already existed.');
    }
    const hashPassword = await bcrypt.hash(createUserInput.password, 10);
    createUserInput.password = hashPassword;
    const newUser = this.userRepository.create(createUserInput);
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneOrFail(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneOrFail({ email: email });
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new ForbiddenError('User not found.');
    }
    const updated = Object.assign(user, updateUserInput);
    return await this.userRepository.save(updated);
  }

  async remove(id: number): Promise<string> {
    await this.userRepository.delete(id);
    return 'Delete success';
  }
}
