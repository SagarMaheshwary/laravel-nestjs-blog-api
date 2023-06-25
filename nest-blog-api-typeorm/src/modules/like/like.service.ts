import { Inject, Injectable } from '@nestjs/common';
import { LIKE_REPOSITORY } from 'src/constants/database';
import { Repository } from 'typeorm';
import { Like } from './like.entity';

@Injectable()
export class LikeService {
  constructor(@Inject(LIKE_REPOSITORY) likeRepository: Repository<Like>) {}

  async commentLikes() {}
}
