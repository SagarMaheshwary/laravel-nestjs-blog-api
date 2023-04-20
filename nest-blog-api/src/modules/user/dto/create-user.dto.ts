import { IsDefined, Length, IsEmail, Validate } from 'class-validator';
import { UniqueDatabase } from 'src/validators/unique-database';
import { User } from '../user.model';

export class CreateUserDTO {
  id?: number;

  @IsDefined()
  @Length(2, 50)
  name: string;

  @IsDefined()
  @IsEmail()
  @Length(5, 255)
  @Validate(UniqueDatabase, [User])
  email: string;

  @IsDefined()
  @Length(5, 255)
  password: string;

  role?: string;
}
