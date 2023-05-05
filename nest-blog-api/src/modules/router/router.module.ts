import { Module } from '@nestjs/common';
import { RouterModule as NestRouterModule } from '@nestjs/core';
import { AuthModule } from '../auth/auth.module';
import { PostModule } from '../post/post.module';
import { PostModule as AdminPostModule } from '../admin/post/post.module';
import { CategoryModule as AdminCategoryModule } from '../admin/category/category.module';

@Module({
  imports: [
    NestRouterModule.register([
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
})
export class RouterModule {}
