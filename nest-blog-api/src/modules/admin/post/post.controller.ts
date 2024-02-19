import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { response } from 'src/helpers/common';
import { CreatePostDTO } from 'src/modules/post/dto/create-post.dto';
import { PostService } from 'src/modules/post/post.service';
import { Post as PostEntity } from 'src/modules/post/post.entity';
import { User } from 'src/modules/auth/decorators/user.decorator';
import { User as UserEntity } from 'src/modules/user/user.entity';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { Role } from 'src/modules/user/enum/role.enum';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { UpdatePostDTO } from 'src/modules/post/dto/update-post.dto';
import { RequestContextInterceptor } from 'src/modules/app/request-context.interceptor';
import { StripContextPipe } from 'src/modules/app/strip-context.pipe';
import { CURRENT_PAGE, PER_PAGE } from 'src/constants/common';

@UseGuards(RolesGuard)
@Roles(Role.admin)
@Controller()
export class PostController {
  constructor(@Inject(PostService) private readonly postService: PostService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async index(
    @Query('page', new DefaultValuePipe(CURRENT_PAGE)) page: number,
    @Query('per_page', new DefaultValuePipe(PER_PAGE)) perPage: number,
  ) {
    const posts = await this.postService.paginated(page, perPage, {
      relations: ['categories'],
      select: {
        id: true,
        slug: true,
        title: true,
        body: true,
        image: true,
        user_id: true,
        created_at: true,
      },
    });

    //@TODO: make it a db function.
    posts.items.forEach(
      (post: PostEntity) => (post.body = post.body.substring(0, 300)),
    );

    return response({ posts });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async store(@User() user: UserEntity, @Body() dto: CreatePostDTO) {
    const post = await this.postService.save(user.id, dto);

    return response({ post }, 'Created a new post.');
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async show(@Param('id') id: number) {
    const post = await this.postService.findOne(id, ['categories']);

    return response({ post });
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(RequestContextInterceptor)
  async update(
    @Param('id') id: number,
    @Body(StripContextPipe) dto: UpdatePostDTO,
  ) {
    let post = await this.postService.findOne(id);
    post = await this.postService.update(post, dto);

    return response({ post }, 'Select post has been updated.');
  }
}
