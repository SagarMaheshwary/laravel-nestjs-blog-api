import { Allow } from 'class-validator';

export class BaseDTO {
  @Allow()
  context?: {
    params: any;
    query: any;
  };
}
