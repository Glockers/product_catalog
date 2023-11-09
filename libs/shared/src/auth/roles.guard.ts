import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../constants';
import { ROLES_KEY } from './roles.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';
import { NAME_JWT_COOKIE } from '../constants/jwt.constants';
import { Tokens } from '../types/tokens.type';
import { Request } from 'express';
import { AuthCommunicationHelper } from '../microservice';
import { GET_USER_ROLE } from '../endpoints';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly authCommunicationHelper: AuthCommunicationHelper,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (!requiredRoles) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req as Request;
    const tokens = request?.cookies[NAME_JWT_COOKIE] as Tokens;
    if (!tokens) return false;
    const userRole =
      await this.authCommunicationHelper.sentToMicroservice<Role>(
        GET_USER_ROLE,
        { tokens }
      );

    return requiredRoles.includes(userRole);
  }
}
