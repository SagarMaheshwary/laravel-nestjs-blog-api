import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { likeProviders } from './like.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...likeProviders, LikeService],
  exports: [...likeProviders, LikeService],
})
export class LikeModule {}
