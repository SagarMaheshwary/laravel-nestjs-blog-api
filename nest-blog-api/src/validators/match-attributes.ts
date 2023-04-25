import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class MatchAttributes implements ValidatorConstraintInterface {
  /**
   * Match Against an attribute same as the current field but
   * suffixed as _confirmation.
   */
  validate(value: any, validationArguments?: ValidationArguments): boolean {
    const field = validationArguments.property;
    const match = validationArguments.object[`${field}_confirmation`];

    return field === match;
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    const field = validationArguments.property;

    return `The ${field} confirmation does not match.`;
  }
}
