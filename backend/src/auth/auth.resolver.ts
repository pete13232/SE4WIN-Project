import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import LoginUserInput from './dto/login-user.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
  ): Promise<string> {
    return this.authService.login(loginUserInput);
  }

  @Query(() => User)
  async verify(@Args('token') token: string): Promise<User> {
    return this.authService.verify(token);
  }
}
