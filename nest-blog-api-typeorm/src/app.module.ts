import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HomeModule } from './modules/home/home.module';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { CategoryModule } from './modules/category/category.module';
import { AuthModule } from './modules/auth/auth.module';
import { RouterModule } from './modules/router/router.module';
import { DatabaseModule } from './modules/database/database.module';
import config from './config';

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
  ],
})
export class AppModule {}
