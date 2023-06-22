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
 * Usage:
 * Creating an entity:
 * @Validate(UniqueDatabase, [User, 'email'])
 *
 * Updating an entity:
 * @Validate(UniqueDatabase, [User, 'email', 'id'])
 *
 * Params:
 *  - TypeORM Entity,
 *  - Column to check for uniqueness (optional without third param)
 *  - Primary Key or any column for ignoring validation on the
 *    specified row. (optional)
 *
 * In order to get the "context" values you need to apply the
 * "RequestContextInterceptor" to the controller method and
 * pass "StripContextPipe" to the @Body decorator.
 *
 * Check the UpdateCategoryDTO and admin/CategoryController's update method for example.
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
    //Fail validation if property does not have any value.
    if (!value) {
      return true;
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
