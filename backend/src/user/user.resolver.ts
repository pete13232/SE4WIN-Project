import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import LoginUserInput from 'src/auth/dto/login-user.input';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from './enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Resolver(() => User)
export class UserResolver {
  /**
   * Inject User Service
   *
   * parameter: userService
   */
  constructor(private readonly userService: UserService) {}

  /**
   * Create User
   *
   * parameter: createUserInput
   * return: Created User
   */
  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.userService.create(createUserInput);
  }

  /**
   * Show all Users
   *
   * require: Signed In with Admin Role
   * return: List of Users
   */
  @Query(() => [User], { name: 'users' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  /**
   * Find User by Id
   *
   * require: Signed In with Admin Role
   * parameter: id
   * return: User
   */
  @Query(() => User, { name: 'user' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return await this.userService.findOne(id);
  }

  /**
   * Find User by Email
   *
   * require: Signed In with Admin Role
   * parameter: loginUserInput
   * return: User
   */
  @Query(() => User, { name: 'email' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async findByEmail(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
  ): Promise<User> {
    return await this.userService.findByEmail(loginUserInput);
  }

  /**
   * Update User Information
   *
   * require: Signed In
   * parameter: updateUserInput
   * return: Updated User
   */
  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return await this.userService.update(updateUserInput.id, updateUserInput);
  }

  /**
   * Remove User
   *
   * require: Signed In with Admin Role
   * parameter: id
   * return: Success Message
   */
  @Mutation(() => String)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async removeUser(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<string> {
    return await this.userService.remove(id);
  }

  /**
   * Get Current User
   *
   * require: Signed In
   * parameter: id
   * return: Current User
   */
  @Query(() => User, { name: 'me' })
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: User): Promise<User> {
    return await this.userService.findOne(user.id);
  }
}
