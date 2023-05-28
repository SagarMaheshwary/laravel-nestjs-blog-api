import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { PostModule } from '../post/post.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [PostModule, CategoryModule],
  controllers: [HomeController],
  providers: [],
})
export class HomeModule {}
