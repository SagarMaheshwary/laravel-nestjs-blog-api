import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post.model';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post) private readonly postModel: typeof Post) {}

  paginated() {
    return this.postModel.findAll({
      limit: 10,
    });
  }
}
