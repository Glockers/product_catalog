import { AuthenticationError } from '@nestjs/apollo';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { NAME_JWT_STRATEGY } from '../constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard(NAME_JWT_STRATEGY) {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  handleRequest(err, jwtPayload) {
    if (err || !jwtPayload) {
      throw err || new AuthenticationError('Could not authenticate with token');
    }
    return jwtPayload;
  }
}
