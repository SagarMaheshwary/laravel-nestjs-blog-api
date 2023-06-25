import { Inject, Injectable } from '@nestjs/common';
import { COMMENT_REPOSITORY, LIKE_REPOSITORY } from 'src/constants/database';
import { FindManyOptions, IsNull, Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { Paginator } from 'src/lib/paginator';
import { UpdateCommentDTO } from './dto/update-comment.dto';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { IPaginator } from 'src/lib/interfaces/paginator';
import { Like } from '../like/like.entity';

@Injectable()
export class CommentService {
  constructor(
    @Inject(COMMENT_REPOSITORY)
    private readonly commentRepository: Repository<Comment>,
    @Inject(LIKE_REPOSITORY)
    private readonly likeRepository: Repository<Like>,
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

    const response = await paginator.paginate();

    const repliesCount = await this.getRepliesCount(
      response.items.map((item: Comment) => item.id),
    );

    response.items.forEach((item: Comment) => {
      const count = repliesCount.find((count) => count.parent_id == item.id);

      item.replies_count = Number(count?.replies_count || 0);
    });

    return response;
  }

  async paginatedReplies(
    id: number,
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
        parent_id: id,
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

  async likes(id: number): Promise<Like[]> {
    const comment = await this.commentRepository.findOne({
      select: {
        id: true,
        likes: {
          id: true,
          likeable_id: true,
          user_id: true,
          user: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      relations: {
        likes: {
          user: true,
        },
      },
      where: {
        id,
        likes: {
          likeable_type: Comment.name,
        },
      },
    });

    return comment?.likes || [];
  }

  async toggleLike(id: number, userId: number): Promise<boolean> {
    const likeAttributes = {
      likeable_id: id,
      likeable_type: Comment.name,
      user_id: userId,
    };

    const like = await this.likeRepository.findOneBy(likeAttributes);

    if (like) {
      await like.remove();

      return false;
    }

    return Boolean(await this.likeRepository.save(likeAttributes));
  }

  private async getRepliesCount(parentIds: number[] = []): Promise<any[]> {
    return await this.commentRepository
      .createQueryBuilder('comment')
      .select('parent_id', 'parent_id')
      .addSelect('COUNT(id)', 'replies_count')
      .where('parent_id in (:...parent_ids)', {
        parent_ids: parentIds,
      })
      .groupBy('parent_id')
      .getRawMany();
  }
}
