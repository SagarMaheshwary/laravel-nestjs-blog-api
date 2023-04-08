import { DataTypes, QueryInterface, Sequelize } from "sequelize"

const table = "users";

export = {
    up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
        await queryInterface.createTable(table, {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(255),
                unique: true,
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            role: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: sequelize.fn('NOW'),
                allowNull: false,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        });
    },

    down: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
        await queryInterface.dropTable(table);
    },
}
