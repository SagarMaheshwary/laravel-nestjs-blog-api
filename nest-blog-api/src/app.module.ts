import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './modules/user/user.model';
import { Sequelize } from 'sequelize-typescript';
import { Post } from './modules/post/post.model';
import { Category } from './modules/category/category.model';
import { PostModule } from './modules/post/post.module';
import { CategoryModule } from './modules/category/category.module';
import { PostModule as AdminPostModule } from './modules/admin/post/post.module';
import { CategoryModule as AdminCategoryModule } from './modules/admin/category/category.module';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PostModule,
    CategoryModule,
    AdminPostModule,
    AdminCategoryModule,
    JwtModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        dialect: configService.get('database.dialect'),
        host: configService.get('database.host'),
        database: configService.get('database.database'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        port: configService.get('database.port'),
        schema: configService.get('database.schema'),
        models: [User, Post, Category],
        logging: (sql, timing) => new Logger(Sequelize.name).log(sql),
      }),
    }),
    RouterModule.register([
      {
        path: 'auth',
        module: AuthModule,
      },
      {
        path: 'posts',
        module: PostModule,
      },
      {
        path: 'admin',
        children: [
          {
            path: 'posts',
            module: AdminPostModule,
          },
          {
            path: 'categories',
            module: AdminCategoryModule,
          },
        ],
      },
    ]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
