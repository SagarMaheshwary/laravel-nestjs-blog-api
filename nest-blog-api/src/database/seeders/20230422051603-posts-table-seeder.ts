import { faker } from '@faker-js/faker';
import { QueryInterface, Sequelize, QueryTypes } from 'sequelize';
import { Category } from 'src/modules/category/category.model';
import { Post } from 'src/modules/post/models/post.model';
import { User } from 'src/modules/user/user.model';

const table = 'posts';

export = {
  async up(queryInterface: QueryInterface, sequelize: Sequelize) {
    const count = 100; //No of posts we will create

    //Owner of the posts
    const [user] = <User[]>await queryInterface.sequelize.query(
      'SELECT id FROM users WHERE email = :email LIMIT 1',
      {
        replacements: { email: 'admin@gmail.com' },
        type: QueryTypes.SELECT,
      },
    );

    //Category to attach to posts.
    const categories = <Category[]>(
      await queryInterface.sequelize.query(
        'SELECT id from categories LIMIT 5',
        { type: QueryTypes.SELECT },
      )
    );

    for (let i = 0; i < count; i++) {
      const [post] = <Post[]>(
        await queryInterface.sequelize.query(
          'INSERT INTO posts (slug, title, body, image, user_id) VALUES (:slug, :title, :body, :image, :user_id) RETURNING id',
          {
            replacements: {
              slug: faker.helpers.slugify(faker.lorem.sentences(2)),
              title: faker.lorem.sentences(2),
              body: faker.lorem.sentences(50),
              image: faker.image.abstract(),
              user_id: user.id,
            },
            raw: true,
          },
        )
      )[0];

      await queryInterface.bulkInsert(
        'post_category',
        categories.map((category) => ({
          post_id: post.id,
          category_id: category.id,
        })),
      );
    }
  },

  async down(queryInterface: QueryInterface, sequelize: Sequelize) {
    const [user] = <User[]>await queryInterface.sequelize.query(
      'SELECT * FROM users WHERE email = :email LIMIT 1',
      {
        replacements: { email: 'admin@gmail.com' },
        type: QueryTypes.SELECT,
      },
    );

    const posts = <Post[]>await queryInterface.sequelize.query(
      'SELECT id FROM posts WHERE user_id = :user_id',
      {
        replacements: { user_id: user.id },
        type: QueryTypes.SELECT,
      },
    );

    //Delete post category mappings before deleting the actual posts.
    await queryInterface.bulkDelete('post_category', {
      post_id: posts.map((post) => post.id),
    });

    await queryInterface.bulkDelete(table, {
      user_id: user.id,
    });
  },
};
