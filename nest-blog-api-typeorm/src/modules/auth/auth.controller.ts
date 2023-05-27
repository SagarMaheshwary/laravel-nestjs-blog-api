import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { Public } from './decorators/public.decorator';
import { RegisterDTO } from './dto/register.dto';
import { Role } from '../user/enum/role.enum';
import { response } from 'src/helpers/common';
import { LoginDTO } from './dto/login.dto';
import { User } from './decorators/user.decorator';
import { User as UserEntity } from '../user/user.entity';

@Controller()
export class AuthController {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(UserService) private readonly userService: UserService,
  ) {}

  @Post('/register')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDTO: RegisterDTO) {
    registerDTO.role = Role.user;

    const user = await this.userService.save(registerDTO);
    const token = await this.authService.issueToken(user.id, user.email);

    return response({ user, token }, 'User registered.');
  }

  @Post('/login')
  @Public()
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDTO: LoginDTO) {
    const [user, token] = await this.authService.login(
      loginDTO.email,
      loginDTO.password,
    );

    return response({ user, token }, 'You are logged in!');
  }

  @Get('/profile')
  @HttpCode(HttpStatus.OK)
  async profile(@User() user: UserEntity) {
    return response({ user });
  }
}
