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
import { LoginDTO } from './dto/login.dto';
import { response } from 'src/helpers/common';
import { User as UserModel } from '../user/user.model';
import { RegisterDTO } from './dto/register.dto';
import { UserService } from '../user/user.service';
import { User } from './decorators/user.decorator';
import { Public } from './decorators/public.decorator';

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
    registerDTO.role = 'user';

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
  async profile(@User() user: UserModel) {
    return response({ user });
  }
}
