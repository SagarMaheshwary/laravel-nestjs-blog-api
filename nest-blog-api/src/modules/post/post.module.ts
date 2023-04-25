import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './post.model';

@Module({
  imports: [SequelizeModule.forFeature([Post])],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
