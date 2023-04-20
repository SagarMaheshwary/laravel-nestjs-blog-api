import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDTO } from 'src/modules/user/dto/create-user.dto';

export class RegisterDTO extends OmitType(CreateUserDTO, ['id']) {}
