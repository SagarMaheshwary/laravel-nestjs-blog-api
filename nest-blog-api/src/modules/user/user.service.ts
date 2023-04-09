import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

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
}
