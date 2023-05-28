import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { response } from 'src/helpers/common';
import { Post as PostEntity } from './post.entity';
import { Public } from '../auth/decorators/public.decorator';

@Controller()
export class PostController {
  constructor(@Inject(PostService) private readonly postService: PostService) {}

  @Get()
  @Public()
  @HttpCode(HttpStatus.OK)
  async index(
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Query('per_page', new DefaultValuePipe(12)) perPage: number,
  ) {
    const select = {
      id: true,
      slug: true,
      title: true,
      body: true,
      image: true,
      user_id: true,
      created_at: true,
      user: {
        id: true,
        name: true,
        // image: true, //@TODO: add image column
      },
      categories: {
        id: true,
        title: true,
        image: true,
      },
    };

    const posts = await this.postService.paginated(page, perPage, {
      order: {
        created_at: 'DESC',
      },
      select,
      relations: ['user', 'categories'],
    });

    //@TODO: make it a db function.
    posts.items.forEach(
      (post: PostEntity) => (post.body = post.body.substring(0, 300)),
    );

    return response({ posts });
  }

  @Get(':id')
  @Public()
  @HttpCode(HttpStatus.OK)
  async show(@Param('id') id: number) {
    const post = await this.postService.findOne(id, ['user', 'categories']);

    return response({ post });
  }
}
