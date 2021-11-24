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
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Query(() => User, { name: 'email' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async findByEmail(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
  ): Promise<User> {
    return await this.userService.findByEmail(loginUserInput);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return await this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async removeUser(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<string> {
    return await this.userService.remove(id);
  }

  @Query(() => User, { name: 'me' })
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: User): Promise<User> {
    return await this.userService.findOne(user.id);
  }
}
