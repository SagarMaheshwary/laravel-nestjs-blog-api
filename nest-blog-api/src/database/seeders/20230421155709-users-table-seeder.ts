import { QueryInterface, Sequelize } from 'sequelize';
import * as bcrypt from 'bcrypt';

const table = 'users';

export = {
  async up(queryInterface: QueryInterface, sequelize: Sequelize) {
    //@TODO create constants for ROLES
    await queryInterface.bulkInsert(table, [
      {
        name: 'Admin',
        email: 'admin@gmail.com',
        password: await bcrypt.hash('password', 10),
        role: 'admin',
      },
      {
        name: 'User',
        email: 'user@gmail.com',
        password: await bcrypt.hash('password', 10),
        role: 'user',
      },
    ]);
  },

  async down(queryInterface: QueryInterface, sequelize: Sequelize) {
    await queryInterface.bulkDelete(table, {
      email: ['admin@gmail.com', 'user@gmail.com'],
    });
  },
};
