import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { DatabaseModule } from '../database/database.module';
import { postProviders } from './post.providers';

@Module({
  imports: [DatabaseModule],
  providers: [PostService, ...postProviders],
  exports: [PostService],
})
export class PostModule {}
