import { Inject, Injectable } from '@nestjs/common';
import { LIKE_REPOSITORY, POST_REPOSITORY } from 'src/constants/database';
import { FindManyOptions, Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDTO } from './dto/create-post.dto';
import slugify from 'slugify';
import { faker } from '@faker-js/faker';
import { UpdatePostDTO } from './dto/update-post.dto';
import { Paginator } from 'src/lib/paginator';
import { CategoryService } from '../category/category.service';
import { Like } from '../like/like.entity';

@Injectable()
export class PostService {
  constructor(
    @Inject(CategoryService) private readonly categoryService: CategoryService,
    @Inject(POST_REPOSITORY) private readonly postRepository: Repository<Post>,
    @Inject(LIKE_REPOSITORY) private readonly likeRepository: Repository<Like>,
  ) {}

  async paginated(
    page: number,
    perPage: number,
    findOptions: FindManyOptions<Post> = {},
  ) {
    const paginator = new Paginator(
      this.postRepository,
      findOptions,
      page,
      perPage,
    );

    return await paginator.paginate();
  }

  async latest(limit: number = 10, findOptions: FindManyOptions = {}) {
    findOptions = {
      order: {
        created_at: 'DESC',
      },
      take: limit,
      ...findOptions,
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

  async save(userId: number, dto: CreatePostDTO): Promise<Post> {
    const categories = await this.categoryService.findMany(dto.categories);

    //NOTE: save() method is already wrapped in an explicit transaction.
    const post = await this.postRepository.save({
      title: dto.title,
      slug: slugify(dto.title, { lower: true }),
      body: dto.body,
      //@TODO: upload images to S3.
      image: faker.image.urlLoremFlickr({ category: 'abstract' }),
      user_id: userId,
      categories: categories,
    });

    //Transaction example:
    // await this.postRepository.manager.transaction(async (entityManager) => {
    //   post = await entityManager.save(post);
    // });

    return post;
  }

  async update(post: Post, dto: UpdatePostDTO) {
    const categories = await this.categoryService.findMany(dto.categories);

    post.title = dto.title;
    post.slug = slugify(dto.title, { lower: true });
    post.body = dto.body;

    //@TODO: upload images to S3.
    // post.image = post.image;

    post.categories = categories;
    return await post.save();
  }

  async likes(id: number): Promise<Like[]> {
    const post = await this.postRepository.findOne({
      select: {
        id: true,
        likes: {
          id: true,
          likeable_id: true,
          user: {
            id: true,
            name: true,
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
          likeable_type: Post.name,
        },
      },
    });

    return post?.likes || [];
  }

  async toggleLike(id: number, userId: number): Promise<boolean> {
    const likeAttributes = {
      likeable_id: id,
      likeable_type: Post.name,
      user_id: userId,
    };

    const like = await this.likeRepository.findOneBy(likeAttributes);

    if (like) {
      await like.remove();

      return false;
    }

    return Boolean(await this.likeRepository.save(likeAttributes));
  }
}
