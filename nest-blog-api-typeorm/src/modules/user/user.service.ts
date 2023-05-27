import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dto/create-user.dto';
import { USER_REPOSITORY } from 'src/constants/database';

@Injectable()
export class UserService {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  async save(dto: CreateUserDTO): Promise<User> {
    const password = await bcrypt.hash(
      dto.password,
      this.configService.get('password.salt_rounds'),
    );

    return await this.userRepository.save({
      name: dto.name,
      email: dto.email,
      role: dto.role,
      password,
    });
  }
}
