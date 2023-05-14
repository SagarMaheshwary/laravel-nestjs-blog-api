import { Inject, Injectable } from '@nestjs/common';
import { Post } from './models/post.model';
import { POST_REPOSITORY, SEQUELIZE } from 'src/constants/sequelize';
import { Paginator } from 'src/lib/paginator';
import { Sequelize } from 'sequelize-typescript';
import { Paginator as IPaginator } from 'src/lib/interfaces/paginator';
import { Includeable } from 'sequelize';
import { CreatePostDTO } from './dto/create-post.dto';
import { faker } from '@faker-js/faker';
import { Category } from '../category/category.model';
import { UpdatePostDTO } from './dto/update-post.dto';
import slugify from 'slugify';

@Injectable()
export class PostService {
  constructor(
    @Inject(POST_REPOSITORY) private readonly postRepository: typeof Post,
    @Inject(SEQUELIZE) private readonly sequelize: Sequelize,
  ) {}

  async paginated(
    page: number,
    perPage: number,
    relations: Includeable[] = [],
  ): Promise<IPaginator> {
    const paginator = new Paginator(
      this.sequelize,
      Post,
      {
        order: [['id', 'DESC']],
        attributes: [
          'id',
          'slug',
          'title',
          [Sequelize.fn('SUBSTRING', Sequelize.col('body'), 0, 300), 'body'],
          'user_id',
          'image',
          'created_at',
        ],
        include: relations,
      },
      page,
      perPage,
    );

    return await paginator.paginate();
  }

  async findOne(id: number, relations: Includeable[] = []): Promise<Post> {
    return await this.postRepository.findByPk(id, { include: relations });
  }

  async save(userId: number, dto: CreatePostDTO): Promise<Post | undefined> {
    const transaction = await this.sequelize.transaction();

    try {
      const post = await this.postRepository.create(
        {
          title: dto.title,
          slug: slugify(dto.title, { lower: true }),
          body: dto.body,
          image: faker.image.abstract(),
          user_id: userId,
        },
        { transaction },
      );
      await post.addCategories(dto.categories, { transaction });

      await transaction.commit();

      await post.reload({
        include: [Category],
      });

      return post;
    } catch (err) {
      console.error(err);

      await transaction.rollback();

      return undefined;
    }
  }

  async update(post: Post, dto: UpdatePostDTO): Promise<Post | undefined> {
    const transaction = await this.sequelize.transaction();

    try {
      post.title = dto.title;
      post.body = dto.body;
      post.slug = slugify(dto.title, { lower: true });

      if (dto.image) {
        //@TODO: upload image to S3 and delete existing.
      }

      await post.save({ transaction });
      await post.removeCategories(post.categories, { transaction });
      await post.addCategories(dto.categories, { transaction });

      await transaction.commit();

      await post.reload({ include: [Category] });

      return post;
    } catch (err) {
      console.error(err);

      await transaction.rollback();

      return undefined;
    }
  }
}
