import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

const table = 'post_category';

export = {
  up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        table,
        {
          post_id: {
            type: DataTypes.BIGINT,
            references: {
              model: {
                tableName: 'posts',
              },
              key: 'id',
            },
          },
          category_id: {
            type: DataTypes.BIGINT,
            references: {
              model: {
                tableName: 'categories',
              },
              key: 'id',
            },
          },
        },
        { transaction },
      );

      await queryInterface.addConstraint(table, {
        type: 'primary key',
        fields: ['post_id', 'category_id'],
        transaction,
      });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  down: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
    return queryInterface.dropTable(table);
  },
};
