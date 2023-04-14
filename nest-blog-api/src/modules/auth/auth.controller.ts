import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { response } from 'src/helpers/common';
import { AuthGuard } from './auth.guard';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthService) private authService: AuthService,
    @Inject(UserService) private userService: UserService,
  ) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDTO: LoginDTO) {
    const token = await this.authService.login(loginDTO);

    return response({ token }, 'You are logged in!');
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async profile(@Req() req) {
    return await this.userService.findOne(req.user.sub);
  }
}
