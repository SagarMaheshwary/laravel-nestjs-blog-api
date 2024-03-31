import { Inject } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DATA_SOURCE } from 'src/constants/database';
import { DataSource } from 'typeorm';

/**
 * Checkout UniqueDatabase validator class for usage instructions as it's
 * similar to that class.
 *
 * Checkout LoginDTO for example.
 */
@ValidatorConstraint({
  name: 'ExistsDatabase',
  async: true,
})
export class ExistsDatabase implements ValidatorConstraintInterface {
  constructor(@Inject(DATA_SOURCE) private readonly connection: DataSource) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    //Fail validation if property does not have any value.
    if (!value) {
      return true;
    }

    const entityClass = validationArguments.constraints[0];
    const column =
      (validationArguments.constraints[1] as string) ||
      validationArguments.property;

    const entityRepository = this.connection.getRepository(entityClass);

    const entity = await entityRepository.findOne({
      where: {
        [column]: value,
      },
      select: [column],
    });

    return Boolean(entity);
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `The given ${validationArguments.property} does not exists.`;
  }
}
