import { faker } from '@faker-js/faker';
import { Comment } from 'src/modules/comment/comment.entity';
import { Post } from 'src/modules/post/post.entity';
import { Role } from 'src/modules/user/enum/role.enum';
import { User } from 'src/modules/user/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CommentsTableSeeder1687629187803 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const commentsCount = 5;
    const repliesCount = 5;

    const posts = await Post.find({
      select: {
        id: true,
      },
    });

    const user = await User.findOne({
      select: {
        id: true,
      },
      where: {
        role: Role.user,
      },
    });

    for await (let post of posts) {
      const comments = [];

      for (let i = 0; i < commentsCount; i++) {
        comments.push({
          user_id: user.id,
          post_id: post.id,
          body: faker.lorem.sentence(10),
        });
      }

      //Create comments for each post.
      const commentIds = await Comment.createQueryBuilder()
        .insert()
        .into(Comment)
        .values(comments)
        .returning(['id'])
        .execute();

      for await (let commentId of commentIds.raw) {
        const replies = [];

        for (let i = 0; i < repliesCount; i++) {
          replies.push({
            parent_id: commentId,
            user_id: user.id,
            post_id: post.id,
            body: faker.lorem.sentence(10),
          });
        }

        //Create replies for the newly created comments.
        await Comment.createQueryBuilder()
          .insert()
          .into(Comment)
          .values(replies)
          .execute();
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const user = await User.findOne({
      select: {
        id: true,
      },
      where: {
        role: Role.user,
      },
    });

    await Comment.createQueryBuilder()
      .where('user_id = :user_id', {
        user_id: user.id,
      })
      .delete()
      .execute();
  }
}
