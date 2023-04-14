import { InjectConnection } from '@nestjs/sequelize';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Sequelize } from 'sequelize-typescript';

@ValidatorConstraint({
  name: 'UniqueDatabaseField',
  async: true,
})
export class UniqueDatabaseField implements ValidatorConstraintInterface {
  constructor(@InjectConnection() private readonly sequelize: Sequelize) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const modelClass = validationArguments.constraints[0]; //Sequelize model class
    const column = validationArguments.constraints[1] as string; //Column to query from

    const model = await this.sequelize.getRepository(modelClass).findOne({
      where: {
        [column]: value,
      },
    });

    return !Boolean(model);
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `The ${validationArguments.constraints[1]} should be unique.`;
  }
}
