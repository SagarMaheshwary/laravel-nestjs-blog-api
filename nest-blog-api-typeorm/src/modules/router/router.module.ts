import { Module } from '@nestjs/common';
import { RouterModule as NestRouterModule } from '@nestjs/core';
import { HomeModule } from '../home/home.module';
import { AuthModule } from '../auth/auth.module';
import { PostModule } from '../post/post.module';

@Module({
  imports: [
    NestRouterModule.register([
      {
        path: '/home',
        module: HomeModule,
      },
      {
        path: 'auth',
        module: AuthModule,
      },
      {
        path: 'posts',
        module: PostModule,
      },
    ]),
  ],
})
export class RouterModule {}
