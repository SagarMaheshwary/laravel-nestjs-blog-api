import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class RequestContextInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = <Request>context.switchToHttp().getRequest();

    if (request.body) {
      request.body.context = {
        params: request.params,
        query: request.query,
      };
    }

    return next.handle();
  }
}
