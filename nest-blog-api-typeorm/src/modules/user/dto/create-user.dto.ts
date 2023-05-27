import { IsDefined, Length, IsEmail, Validate } from 'class-validator';
import { User } from '../user.entity';
import { UniqueDatabase } from 'src/validators/unique-database';
import { Role } from '../enum/role.enum';

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

  role?: Role;
}
