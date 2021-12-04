import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

//Determine whether a given request will be use in function
export class GqlAuthGuard extends AuthGuard('jwt') {
  
  //Change HTTP Request to GQL Request
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);    
    return ctx.getContext().req;
  }
}
