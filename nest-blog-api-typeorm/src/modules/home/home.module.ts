import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { PostModule } from '../post/post.module';
import { CategoryModule } from '../category/category.module';
import { PostService } from '../post/post.service';
import { CategoryService } from '../category/category.service';

@Module({
  imports: [PostModule, CategoryModule],
  controllers: [HomeController],
  providers: [PostService, CategoryService],
})
export class HomeModule {}
