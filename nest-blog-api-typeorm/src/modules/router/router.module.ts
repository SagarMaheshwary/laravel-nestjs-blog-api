import { Module } from '@nestjs/common';
import { RouterModule as NestRouterModule } from '@nestjs/core';
import { HomeModule } from '../home/home.module';
import { AuthModule } from '../auth/auth.module';
import { PostModule } from '../post/post.module';
import { PostModule as AdminPostModule } from '../admin/post/post.module';
import { CategoryModule as AdminCategoryModule } from '../admin/category/category.module';
import { CommentModule } from '../comment/comment.module';

@Module({
  imports: [
    NestRouterModule.register([
      {
        path: 'home',
        module: HomeModule,
      },
      {
        path: 'auth',
        module: AuthModule,
      },
      {
        path: 'posts',
        module: PostModule,
        children: [
          {
            path: ':postId/comments',
            module: CommentModule,
          },
        ],
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
})
export class RouterModule {}
