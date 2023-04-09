import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(JwtService) private jwtService: JwtService,
  ) {}

  async login(loginDTO: LoginDTO): Promise<string> {
    const user = await this.userService.findByEmail(loginDTO.email);

    if (user?.password !== loginDTO.password) {
      throw new UnauthorizedException();
    }

    return await this.jwtService.signAsync({
      username: user.email,
      sub: user.id,
    });
  }
}
