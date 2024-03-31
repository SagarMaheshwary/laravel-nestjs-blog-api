import { Inject } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DATA_SOURCE } from 'src/constants/database';
import { DataSource, Not } from 'typeorm';
import { ContextValidationArguments } from './interfaces/validation-arguments';

/**
 * Params:
 * 1. TypeORM Entity
 * 2. Column to check for uniqueness (if not provided then property name will be used but
 *    required when passing third argument)
 * 3. A route param present in the DTO's request that will be used as a "where not" statement
 *    in the typeorm query because there may be instances where you want to check for column's
 *    uniqueness but ignore a row e.g when updating a user profile we should not check for the
 *    uniqueness against that row because it's going to be same and will fail the validation.
 *
 * Setup Instructions:
 * - Set class-validator to use Nest container that allows dependency injection by using
 *   useContainer from class-validator in main.ts
 * - Import this class to providers array of the controller module and also import
 *   DatabaseModule in that module to allow injection of TypeORM connection.
 *
 * Basic Usage Example:
 * - Add @Validate(UniqueDatabase, [User, 'email']) to a DTO class property.
 * - Checkout modules/auth/AuthController.register() method for example usage.
 *
 * Example With Third Argument:
 * - Add @Validate(UniqueDatabase, [Category, 'title', 'id']) to a DTO class property.
 * - Add @UseInterceptors(RequestContextInterceptor) to the controller method.
 * - Pass "StripContextPipe" to that method's @Body decorator.
 * - Checkout modules/admin/category/CategoryController.update() method for example usage.
 */
@ValidatorConstraint({
  name: 'UniqueDatabase',
  async: true,
})
export class UniqueDatabase implements ValidatorConstraintInterface {
  constructor(@Inject(DATA_SOURCE) private readonly connection: DataSource) {}

  async validate(
    value: any,
    validationArguments?: ContextValidationArguments,
  ): Promise<boolean> {
    if (!value) {
      return true; //Fail validation if property does not have any value.
    }

    const entityClass = validationArguments.constraints[0];
    const column =
      (validationArguments.constraints[1] as string) ||
      validationArguments.property;
    const ignoreParam = validationArguments.constraints[2];

    const entityRepository = this.connection.getRepository(entityClass);

    const where = {
      [column]: value,
    };

    if (ignoreParam) {
      where[ignoreParam] = Not(
        validationArguments.object.context.params[ignoreParam],
      );
    }

    const entity = await entityRepository.findOne({
      where,
      select: [column],
    });

    return !Boolean(entity);
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `The ${validationArguments.property} should be unique.`;
  }
}
