import { Inject } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE } from 'src/constants/sequelize';

@ValidatorConstraint({
  name: 'UniqueDatabase',
  async: true,
})
export class UniqueDatabase implements ValidatorConstraintInterface {
  constructor(@Inject(SEQUELIZE) private readonly sequelize: Sequelize) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    //Fail validation if property does not have any value.
    if (!value) {
      return true;
    }

    const modelClass = validationArguments.constraints[0]; //Sequelize model class
    const column =
      (validationArguments.constraints[1] as string) ||
      validationArguments.property; //Column to query from

    const model = await this.sequelize.getRepository(modelClass).findOne({
      where: {
        [column]: value,
      },
    });

    return !Boolean(model);
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `The ${validationArguments.property} should be unique.`;
  }
}
