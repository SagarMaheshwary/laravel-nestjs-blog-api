import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { response } from 'src/helpers/common';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { User } from 'src/modules/auth/decorators/user.decorator';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Category } from 'src/modules/category/category.model';
import { CreatePostDTO } from 'src/modules/post/dto/create-post.dto';
import { UpdatePostDTO } from 'src/modules/post/dto/update-post.dto';
import { PostService } from 'src/modules/post/post.service';
import { Role } from 'src/modules/user/enum/roles.enum';
import { User as UserModel } from 'src/modules/user/user.model';

@Controller()
@UseGuards(RolesGuard)
@Roles(Role.admin)
export class PostController {
  constructor(@Inject(PostService) private readonly postService: PostService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async index(
    @Query('page') page: number,
    @Query('per_page', new DefaultValuePipe(12)) perPage: number,
  ) {
    const posts = await this.postService.paginated(page, perPage, [Category]);

    return response({ posts });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async store(@User() user: UserModel, @Body() dto: CreatePostDTO) {
    const post = await this.postService.save(user.id, dto);

    if (!post) {
      throw new InternalServerErrorException('Unable to create post.');
    }

    return response({ post }, 'Created new post.');
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async show(@Param('id') id: number) {
    const post = await this.postService.findOne(id, [Category]);

    return response({ post });
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: number, @Body() dto: UpdatePostDTO) {
    const post = await this.postService.findOne(id, [
      {
        model: Category, //association needed for deleting existing rows.
        attributes: ['id'],
      },
    ]);

    const updatedPost = await this.postService.update(post, dto);

    if (!updatedPost) {
      throw new InternalServerErrorException('Unable to update post.');
    }

    return response({ post: updatedPost }, 'Selected post has been updated.');
  }
}
