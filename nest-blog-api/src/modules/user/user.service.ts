import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  async findOne(id: number): Promise<User> {
    return await this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({
      where: {
        email,
      },
    });
  }

  async save(user: CreateUserDTO): Promise<User> {
    const password = await bcrypt.hash(
      user.password,
      this.configService.get('password.salt_rounds'),
    );

    console.time('QUERY');
    const res = await this.userModel.create({
      name: user.name,
      email: user.email,
      password,
      role: user.role,
    });

    console.timeEnd('QUERY');
    return res;
  }
}
