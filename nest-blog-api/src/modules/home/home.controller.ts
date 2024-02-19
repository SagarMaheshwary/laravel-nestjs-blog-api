import { Controller, Get, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { PostService } from '../post/post.service';
import { CategoryService } from '../category/category.service';
import { response } from 'src/helpers/common';
import { Public } from '../auth/decorators/public.decorator';

@Controller()
export class HomeController {
  constructor(
    @Inject(PostService) private readonly postService: PostService,
    @Inject(CategoryService) private readonly categoryService: CategoryService,
  ) {}

  @Get()
  @Public()
  @HttpCode(HttpStatus.OK)
  async index() {
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

    const posts = await this.postService.latest(10, {
      select,
      relations: ['user', 'categories'],
    });

    const categories = await this.categoryService.popularByPosts();

    return response({ posts, categories });
  }
}
