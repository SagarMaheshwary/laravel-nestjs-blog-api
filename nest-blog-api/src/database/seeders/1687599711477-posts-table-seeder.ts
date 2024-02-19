import { faker } from '@faker-js/faker';
import { Category } from 'src/modules/category/category.entity';
import { Post } from 'src/modules/post/post.entity';
import { User } from 'src/modules/user/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostsTableSeeder1687599711477 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const count = 50; //No of posts we will create

    const user = await User.findOne({
      where: {
        email: 'admin@gmail.com',
      },
    });

    const categories = await Category.find();

    for (let i = 0; i < count; i++) {
      await Post.create({
        slug: faker.helpers.slugify(faker.lorem.sentences(2)),
        title: faker.lorem.sentences(2),
        body: faker.lorem.sentences(50),
        image: faker.image.abstract(),
        user_id: user.id,
        categories: categories,
      }).save();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const posts = await Post.find({
      relations: ['categories'],
    });

    for await (let post of posts) {
      post.categories = [];

      await post.save();
    }

    if (posts.length) {
      await Post.createQueryBuilder()
        .where('id IN (:...ids)', {
          ids: posts.map((post) => post.id),
        })
        .delete()
        .execute();
    }
  }
}
