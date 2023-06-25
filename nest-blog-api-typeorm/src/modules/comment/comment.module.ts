import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { commentProviders } from './comment.providers';
import { DatabaseModule } from '../database/database.module';
import { CommentController } from './comment.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...commentProviders, CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
