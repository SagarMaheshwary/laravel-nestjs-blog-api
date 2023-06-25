import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { DatabaseModule } from '../database/database.module';
import { postProviders } from './post.providers';
import { CategoryModule } from '../category/category.module';
import { LikeModule } from '../like/like.module';

@Module({
  imports: [DatabaseModule, CategoryModule, LikeModule],
  controllers: [PostController],
  providers: [...postProviders, PostService],
  exports: [...postProviders, PostService],
})
export class PostModule {}
