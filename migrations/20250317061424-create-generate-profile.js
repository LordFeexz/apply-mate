"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("generate_profiles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      free_points: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 3,
      },
      paid_points: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: { tableName: "users" },
          key: "id",
        },
        validate: {
          notNull: {
            msg: "user_id is required",
          },
          notEmpty: {
            msg: "user_id is required",
          },
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        unique: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("generate_profiles");
  },
};
