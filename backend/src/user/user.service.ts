import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenError } from 'apollo-server-errors';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import LoginUserInput from 'src/auth/dto/login-user.input';

@Injectable()
export class UserService {
  /**
   *
   * Inject to database repository
   *
   */
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * Create User
   *
   * parameter: createUserInput
   * return: Created User
   */
  async create(createUserInput: CreateUserInput): Promise<User> {
    //Check if product is already exists
    const user = await this.userRepository.findOne({
      email: createUserInput.email,
    });
    if (user) {
      throw new ForbiddenError('This email is already being used.');
    }

    //Hashing password
    const hashPassword = await bcrypt.hash(createUserInput.password, 10);
    createUserInput.password = hashPassword;

    //Create a new user instance
    const newUser = this.userRepository.create(createUserInput);

    //Save to database
    return await this.userRepository.save(newUser);
  }

  /**
   * Show All Users
   *
   * return: List of Users
   */
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  /**
   * Find User by Id
   *
   * parameter: id
   * return: User
   */
  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneOrFail(id);
  }

  /**
   * Find User by Email
   *
   * parameter: loginUserInput
   * return: User
   */
  async findByEmail(loginUserInput: LoginUserInput): Promise<User> {
    //Find user by email
    const user = await this.userRepository.findOne({
      email: loginUserInput.email,
    });

    //Throw error if not found
    if (!user) {
      throw new ForbiddenError('User not found');
    }

    return user;
  }

  /**
   * Update User Information
   *
   * parameters: id, updateUserInput
   * return: Updated User
   */
  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    //Find user
    const user = await this.userRepository.findOne(id);
    
    //Throw error if not found
    if (!user) {
      throw new ForbiddenError('User not found.');
    }

    //Check if password is correct
    if (updateUserInput.password) {
      const hashPassword = await bcrypt.hash(updateUserInput.password, 10);
      updateUserInput.password = hashPassword;
    }

    //Copy update infomation to current infomation
    const updated = Object.assign(user, updateUserInput);

    //Save to database
    return await this.userRepository.save(updated);
  }

  /**
   * Remove User
   *
   * parameter: id
   * return: Success Message
   */
  async remove(id: number): Promise<string> {
    //Delete product in database
    await this.userRepository.delete(id);
    return 'Delete success';
  }
}
