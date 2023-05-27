import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { DatabaseModule } from '../database/database.module';
import { postProviders } from './post.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PostController],
  providers: [...postProviders, PostService],
  exports: [...postProviders, PostService],
})
export class PostModule {}
