import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { commentProviders } from './comment.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...commentProviders, CommentService],
})
export class CommentModule {}
