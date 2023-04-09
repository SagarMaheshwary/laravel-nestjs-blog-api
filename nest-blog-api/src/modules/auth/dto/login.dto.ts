import { IsDefined, IsEmail, Length } from 'class-validator';

export class LoginDTO {
  @IsDefined()
  @IsEmail()
  @Length(5, 255)
  email: string;

  @IsDefined()
  @Length(5, 255)
  password: string;
}
