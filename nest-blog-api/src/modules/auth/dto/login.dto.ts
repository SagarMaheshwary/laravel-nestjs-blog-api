import { IsDefined, IsEmail, Length, Validate } from 'class-validator';
import { User } from 'src/modules/user/user.model';
import { UniqueDatabaseField } from 'src/validators/unique-database-field';

export class LoginDTO {
  @IsDefined()
  @IsEmail()
  @Length(5, 255)
  email: string;

  @IsDefined()
  @Length(5, 255)
  @Validate(UniqueDatabaseField, [User, 'email'])
  password: string;
}
