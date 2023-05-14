import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostModule as AppPostModule } from 'src/modules/post/post.module';

@Module({
  imports: [AppPostModule],
  controllers: [PostController],
})
export class PostModule {}
