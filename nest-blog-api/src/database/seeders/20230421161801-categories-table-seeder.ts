import { QueryInterface, Sequelize } from 'sequelize';
import { faker } from '@faker-js/faker';

const table = 'categories';

const categories = ['NestJS', 'NodeJS', 'Laravel', 'VueJS', 'ReactJS'];

export = {
  async up(queryInterface: QueryInterface, sequelize: Sequelize) {
    await queryInterface.bulkInsert(
      table,
      categories.map((category) => ({
        title: category,
        description: faker.lorem.words(50),
        image: faker.image.abstract(),
      })),
    );
  },

  async down(queryInterface: QueryInterface, sequelize: Sequelize) {
    await queryInterface.bulkDelete(table, {
      title: categories,
    });
  },
};
