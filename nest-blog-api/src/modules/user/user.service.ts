import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { USER_REPOSITORY } from 'src/constants/sequelize';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async save(dto: CreateUserDTO): Promise<User> {
    const password = await bcrypt.hash(
      dto.password,
      this.configService.get('password.salt_rounds'),
    );

    return await this.userRepository.create({
      name: dto.name,
      email: dto.email,
      password,
      role: dto.role,
    });
  }
}
