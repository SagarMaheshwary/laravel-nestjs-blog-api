import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HomeModule } from '../home/home.module';
import { UserModule } from '../user/user.module';
import { PostModule } from '../post/post.module';
import { CategoryModule } from '../category/category.module';
import { AuthModule } from '../auth/auth.module';
import { RouterModule } from '../router/router.module';
import { DatabaseModule } from '../database/database.module';
import { PostModule as AdminPostModule } from '../admin/post/post.module';
import { CategoryModule as AdminCategoryModule } from '../admin/category/category.module';
import config from '../../config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    DatabaseModule,
    RouterModule,
    HomeModule,
    UserModule,
    PostModule,
    CategoryModule,
    AuthModule,
    DatabaseModule,
    AdminPostModule,
    AdminCategoryModule,
  ],
})
export class AppModule {}
