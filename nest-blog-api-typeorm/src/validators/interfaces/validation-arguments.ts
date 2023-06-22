import { ValidationArguments } from 'class-validator';

export interface ContextValidationArguments extends ValidationArguments {
  object: {
    context: {
      params: any;
      query: any;
    };
  } & Object;
}
