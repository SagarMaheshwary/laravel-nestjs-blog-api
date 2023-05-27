import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { User as UserEntity } from 'src/modules/user/user.entity';

/**
 * Get the currently authenticated user model.
 */
export const User = createParamDecorator(
  (data, ctx: ExecutionContext): UserEntity => {
    const request = ctx.switchToHttp().getRequest<Request>();

    return request['user'] as UserEntity;
  },
);
