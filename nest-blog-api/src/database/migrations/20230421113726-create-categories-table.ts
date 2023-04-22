import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

const table = 'categories';

export = {
  up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
    return queryInterface.createTable(table, {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(100),
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING(250),
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
