import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Role } from 'src/user/enums/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  /**
   * Check If Role Is Correct
   * 
   * parameter: context 
   * return: Boolean 
   */
  canActivate(context: ExecutionContext) {
    //Get required role 
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }


    const ctx = GqlExecutionContext.create(context);

    //Get user role
    const myRole = ctx.getContext().req.user['role'];

    //Compare between required role and user role
    const isValid = requiredRoles.some((role) => myRole?.includes(role));

    // console.log('roles: ', requiredRoles);
    // console.log('context: ', context.switchToHttp().getRequest());
    // const { user } = ctx.getContext().req.user;
    // console.log('gqlContext: ', isValid);
    // console.log('gqlContext: ', user);

    return isValid;
  }
}
