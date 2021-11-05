import { Resolver } from '@nestjs/graphql';
import { AuthenService } from './authen.service';

@Resolver()
export class AuthenResolver {
  constructor(private readonly authenService: AuthenService) {}
}
