import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { CategoryModule } from './modules/category/category.module';
import { PostModule as AdminPostModule } from './modules/admin/post/post.module';
import { CategoryModule as AdminCategoryModule } from './modules/admin/category/category.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './modules/database/database.module';
import { RouterModule } from './modules/router/router.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    DatabaseModule,
    JwtModule,
    RouterModule,
    UserModule,
    AuthModule,
    PostModule,
    CategoryModule,
    AdminPostModule,
    AdminCategoryModule,
  ],
  providers: [
    {
      //All the routes will require authentication unless we manually
      //set them as "public" via @Public decorator.
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
