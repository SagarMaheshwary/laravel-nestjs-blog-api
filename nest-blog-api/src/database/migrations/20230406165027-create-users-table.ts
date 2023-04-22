import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

const table = 'users';

export = {
  up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
    return queryInterface.createTable(table, {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
      },
      email: {
        type: DataTypes.STRING(255),
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
      },
      role: {
        type: DataTypes.STRING(50),
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('NOW'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
    return queryInterface.dropTable(table);
  },
};
