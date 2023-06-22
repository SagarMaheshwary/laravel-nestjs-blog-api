import { PickType } from '@nestjs/mapped-types';
import { IsDefined, IsEmail, Validate } from 'class-validator';
import { CreateUserDTO } from 'src/modules/user/dto/create-user.dto';
import { User } from 'src/modules/user/user.entity';
import { ExistsDatabase } from 'src/validators/exists-database';

export class LoginDTO extends PickType(CreateUserDTO, ['password' as const]) {
  @IsDefined()
  @IsEmail()
  @Validate(ExistsDatabase, [User])
  email: string;
}
