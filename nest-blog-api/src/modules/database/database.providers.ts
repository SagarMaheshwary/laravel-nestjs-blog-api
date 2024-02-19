import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { User } from '../user/user.entity';
import { DATA_SOURCE } from 'src/constants/database';
import { Post } from '../post/post.entity';
import { Category } from '../category/category.entity';
import { Comment } from '../comment/comment.entity';
import { Like } from '../like/like.entity';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres', //@TODO: get from config
        host: configService.get('database.host'),
        database: configService.get('database.database'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        port: configService.get('database.port'),
        schema: configService.get('database.schema'),
        entities: [User, Post, Category, Comment, Like],
        logging: Boolean(configService.get('database.logging')),
      });

      return dataSource.initialize();
    },
  },
];
