import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { response } from 'src/helpers/common';
import { Post as PostEntity } from './post.entity';
import { Public } from '../auth/decorators/public.decorator';
import { CURRENT_PAGE, PER_PAGE } from 'src/constants/common';
import { User } from '../auth/decorators/user.decorator';
import { User as UserEntity } from '../user/user.entity';

@Controller()
export class PostController {
  constructor(@Inject(PostService) private readonly postService: PostService) {}

  @Get()
  @Public()
  @HttpCode(HttpStatus.OK)
  async index(
    @Query('page', new DefaultValuePipe(CURRENT_PAGE)) page: number,
    @Query('per_page', new DefaultValuePipe(PER_PAGE)) perPage: number,
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
        image: true,
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

  @Get(':id/likes')
  @Public()
  @HttpCode(HttpStatus.OK)
  async likes(@Param('id') id: number) {
    const likes = await this.postService.likes(id);

    return response({ likes });
  }

  @Post(':id/likes')
  @HttpCode(HttpStatus.OK)
  async toggleLike(@Param('id') id: number, @User() user: UserEntity) {
    const liked = await this.postService.toggleLike(id, user.id);

    return response({ liked });
  }
}
