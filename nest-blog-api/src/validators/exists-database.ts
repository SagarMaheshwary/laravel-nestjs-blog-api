import { Inject } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE } from 'src/constants/sequelize';

@ValidatorConstraint({
  name: 'ExistsDatabase',
  async: true,
})
export class ExistsDatabase implements ValidatorConstraintInterface {
  constructor(@Inject(SEQUELIZE) private readonly sequelize: Sequelize) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    //Fail validation if property does not have any value.
    if (!value) {
      return true;
    }

    const [modelClass, column] = validationArguments.constraints;

    const model = await this.sequelize.getRepository(modelClass).findOne({
      where: {
        [column || validationArguments.property]: value,
      },
    });

    return Boolean(model);
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `The given ${validationArguments.property} does not exists.`;
  }
}
