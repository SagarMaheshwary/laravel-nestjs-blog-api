import { Inject, Injectable } from '@nestjs/common';
import { COMMENT_REPOSITORY } from 'src/constants/database';
import { FindManyOptions, IsNull, Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { Paginator } from 'src/lib/paginator';
import { UpdateCommentDTO } from './dto/update-comment.dto';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { IPaginator } from 'src/lib/interfaces/paginator';

@Injectable()
export class CommentService {
  constructor(
    @Inject(COMMENT_REPOSITORY)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async paginatedByPost(
    postId: number,
    page: number,
    perPage: number,
  ): Promise<IPaginator> {
    const findOptions: FindManyOptions<Comment> = {
      select: {
        id: true,
        post_id: true,
        user_id: true,
        body: true,
        created_at: true,
        updated_at: true,
        user: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      relations: ['user'],
      where: {
        post_id: postId,
        parent_id: IsNull(),
      },
    };

    const paginator = new Paginator(
      this.commentRepository,
      findOptions,
      page,
      perPage,
    );

    return await paginator.paginate();
  }

  async paginatedReplies(
    commentId: number,
    page: number,
    perPage: number,
  ): Promise<IPaginator> {
    const findOptions: FindManyOptions<Comment> = {
      select: {
        id: true,
        post_id: true,
        user_id: true,
        parent_id: true,
        body: true,
        created_at: true,
        updated_at: true,
        user: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      where: {
        parent_id: commentId,
      },
      relations: ['user'],
    };

    const paginator = new Paginator(
      this.commentRepository,
      findOptions,
      page,
      perPage,
    );

    return await paginator.paginate();
  }

  async findOne(id: number, relations = []): Promise<Comment> {
    return await this.commentRepository.findOne({
      where: {
        id,
      },
      relations,
    });
  }

  async save(
    postId: number,
    userId: number,
    dto: CreateCommentDTO,
  ): Promise<Comment> {
    return await this.commentRepository.save({
      post_id: postId,
      user_id: userId,
      body: dto.body,
    });
  }

  async update(comment: Comment, dto: UpdateCommentDTO): Promise<Comment> {
    comment.body = dto.body;
    return await comment.save();
  }
}
