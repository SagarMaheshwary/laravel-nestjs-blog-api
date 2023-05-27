import { OmitType } from '@nestjs/mapped-types';
import { IsDefined, Length, Validate } from 'class-validator';
import { CreateUserDTO } from 'src/modules/user/dto/create-user.dto';
import { MatchAttributes } from 'src/validators/match-attributes';

export class RegisterDTO extends OmitType(CreateUserDTO, ['id']) {
  @IsDefined()
  @Length(5, 255)
  @Validate(MatchAttributes)
  password: string;

  @IsDefined()
  @Length(5, 255)
  password_confirmation: string;
}
