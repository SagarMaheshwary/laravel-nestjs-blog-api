import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { User as UserModel } from 'src/modules/user/user.model';

/**
 * Get the currently authenticated user model.
 */
export const User = createParamDecorator(
  (data, ctx: ExecutionContext): UserModel => {
    const request = ctx.switchToHttp().getRequest<Request>();

    return request['user'] as UserModel;
  },
);
