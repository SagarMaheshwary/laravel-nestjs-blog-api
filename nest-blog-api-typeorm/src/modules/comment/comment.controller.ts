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
  UnauthorizedException,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Public } from '../auth/decorators/public.decorator';
import { CURRENT_PAGE, PER_PAGE } from 'src/constants/common';
import { response } from 'src/helpers/common';
import { User } from '../auth/decorators/user.decorator';
import { User as UserEntity } from '../user/user.entity';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { UpdateCommentDTO } from './dto/update-comment.dto';

@Controller()
export class CommentController {
  constructor(
    @Inject(CommentService) private readonly commentService: CommentService,
  ) {}

  @Get()
  @Public()
  @HttpCode(HttpStatus.OK)
  async index(
    @Param('postId') postId: number,
    @Query('page', new DefaultValuePipe(CURRENT_PAGE)) page: number,
    @Query('per_page', new DefaultValuePipe(PER_PAGE)) perPage: number,
  ) {
    const comments = await this.commentService.paginatedByPost(
      postId,
      page,
      perPage,
    );

    return response({ comments });
  }

  @Get(':commentId')
  @Public()
  @HttpCode(HttpStatus.OK)
  async replies(
    @Param('commentId') commentId: number,
    @Query('page', new DefaultValuePipe(CURRENT_PAGE)) page: number,
    @Query('per_page', new DefaultValuePipe(PER_PAGE)) perPage: number,
  ) {
    const comments = await this.commentService.paginatedReplies(
      commentId,
      page,
      perPage,
    );

    return response({ comments });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async store(
    @Param('postId') postId: number,
    @User() user: UserEntity,
    @Body() dto: CreateCommentDTO,
  ) {
    const comment = await this.commentService.save(postId, user.id, dto);

    return response({ comment }, 'Comment posted.');
  }

  @Put(':commentId')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('commentId') commentId: number,
    @User() user: UserEntity,
    @Body() dto: UpdateCommentDTO,
  ) {
    let comment = await this.commentService.findOne(commentId);

    //Only the creator can update the comment.
    if (comment.user_id !== user.id) {
      throw new UnauthorizedException();
    }

    comment = await this.commentService.update(comment, dto);

    return response({ comment }, 'Selected comment has been updated.');
  }

  @Get(':commentId/likes')
  @Public()
  @HttpCode(HttpStatus.OK)
  async likes(@Param('commentId') commentId: number) {
    const likes = await this.commentService.likes(commentId);

    return response({ likes });
  }

  @Post(':commentId/likes')
  @HttpCode(HttpStatus.OK)
  async toggleLikes(
    @Param('commentId') commentId: number,
    @User() user: UserEntity,
  ) {
    const liked = await this.commentService.toggleLike(commentId, user.id);

    return response({ liked });
  }
}
