import { Inject, Injectable } from '@nestjs/common';
import { POST_REPOSITORY } from 'src/constants/database';
import { FindManyOptions, Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDTO } from './dto/create-post.dto';
import slugify from 'slugify';
import { faker } from '@faker-js/faker';
import { UpdatePostDTO } from './dto/update-post.dto';
import { Paginator } from 'src/lib/paginator';

@Injectable()
export class PostService {
  constructor(
    @Inject(POST_REPOSITORY) private readonly postRepository: Repository<Post>,
  ) {}

  async paginated(
    page: number,
    perPage: number,
    findOptions: FindManyOptions<Post>,
  ) {
    const paginator = new Paginator(
      this.postRepository,
      findOptions,
      page,
      perPage,
    );

    return await paginator.paginate();
  }

  async latest(limit: number = 10, findOptions: FindManyOptions) {
    findOptions = {
      ...findOptions,
      order: {
        created_at: 'DESC',
      },
      take: limit,
    };

    const posts = await this.postRepository.find(findOptions);

    //@TODO: make it a db function.
    posts.forEach((post) => {
      post.body = post.body.substring(0, 300);
    });

    return posts;
  }

  async findOne(id: number, relations = []): Promise<Post> {
    return await this.postRepository.findOne({
      where: {
        id,
      },
      relations,
    });
  }

  async save(userId: number, dto: CreatePostDTO): Promise<Post | undefined> {
    const queryRunner =
      this.postRepository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const post = this.postRepository.create({
        title: dto.title,
        slug: slugify(dto.title, { lower: true }),
        body: dto.body,
        image: faker.image.urlLoremFlickr({ category: 'abstract' }),
        user_id: userId,
        categories: dto.categories.map((id) => ({ id })),
      });

      await queryRunner.manager.save(post);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();

      return undefined;
    } finally {
      await queryRunner.release();
    }
  }

  async update(post: Post, dto: UpdatePostDTO) {
    //
  }
}
