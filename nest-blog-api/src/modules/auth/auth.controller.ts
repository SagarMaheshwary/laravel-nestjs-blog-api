import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { response } from 'src/helpers/common';
import { AuthGuard } from './auth.guard';
import { User } from 'src/decorators/auth/user.decorator';
import { User as UserModel } from '../user/user.model';
import { RegisterDTO } from './dto/register.dto';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(UserService) private readonly userService: UserService,
  ) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDTO: RegisterDTO) {
    registerDTO.role = 'user';

    const user = await this.userService.save(registerDTO);
    const token = await this.authService.issueToken(user.id, user.email);

    return response({ user, token }, 'User registered.');
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDTO: LoginDTO) {
    const token = await this.authService.login(
      loginDTO.email,
      loginDTO.password,
    );

    return response({ token }, 'You are logged in!');
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async profile(@User() user: UserModel) {
    return response({ user });
  }
}
