import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

const table = 'posts';

export = {
  up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
    return queryInterface.createTable(table, {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      slug: {
        type: DataTypes.STRING(255),
        unique: true,
      },
      title: {
        type: DataTypes.STRING(255),
      },
      body: {
        type: DataTypes.TEXT,
      },
      image: {
        type: DataTypes.STRING(250),
      },
      user_id: {
        type: DataTypes.BIGINT,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id',
        },
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
