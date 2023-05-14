import { Sequelize } from 'sequelize-typescript';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/user.model';
import { Category } from '../category/category.model';
import { SEQUELIZE } from 'src/constants/sequelize';
import { Post } from '../post/models/post.model';
import { PostCategory } from '../post/models/post-category.model';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: configService.get('database.dialect'),
        host: configService.get('database.host'),
        database: configService.get('database.database'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        port: configService.get('database.port'),
        schema: configService.get('database.schema'),
        models: [User, Post, Category, PostCategory],
        logging: (sql, timing) => new Logger(Sequelize.name).log(sql),
      });

      await sequelize.authenticate();
      return sequelize;
    },
  },
];
