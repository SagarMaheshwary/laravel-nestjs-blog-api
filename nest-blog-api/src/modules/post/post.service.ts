import { Inject, Injectable } from '@nestjs/common';
import { Post } from './post.model';
import { POST_REPOSITORY } from 'src/constants/sequelize';

@Injectable()
export class PostService {
  constructor(
    @Inject(POST_REPOSITORY) private readonly postRepository: typeof Post,
  ) {}

  paginated() {
    return this.postRepository.findAll({
      limit: 10,
    });
  }
}
