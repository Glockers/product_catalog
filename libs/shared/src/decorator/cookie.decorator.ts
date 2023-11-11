import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const Cookie = createParamDecorator(
  (cookieName: string, ctx: ExecutionContext) => {
    const request = GqlExecutionContext.create(ctx).getContext().req;
    return request?.cookies[cookieName] ?? null;
  }
);
