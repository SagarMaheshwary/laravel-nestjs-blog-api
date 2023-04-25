import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.model';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<Array<User | string>> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (!(await bcrypt.compare(password, user?.password))) {
      throw new UnauthorizedException();
    }

    const token = await this.issueToken(user.id, email);

    return [user, token];
  }

  async issueToken(sub: string | number, username: string): Promise<string> {
    return await this.jwtService.signAsync({
      sub,
      username,
    });
  }
}
