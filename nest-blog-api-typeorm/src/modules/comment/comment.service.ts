import { Inject, Injectable } from '@nestjs/common';
import { COMMENT_REPOSITORY } from 'src/constants/database';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @Inject(COMMENT_REPOSITORY)
    private readonly commentRepository: Repository<Comment>,
  ) {}
}
