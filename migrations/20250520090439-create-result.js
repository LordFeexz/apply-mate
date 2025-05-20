"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("results", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
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
      },
      feature: {
        type: Sequelize.ENUM(
          "scoring-cv",
          "generate-optimize-cv",
          "generate-cover-letter"
        ),
        allowNull: false,
        validate: {
          notNull: {
            msg: "feature is required",
          },
          notEmpty: {
            msg: "feature is required",
          },
          isIn: {
            args: [
              ["scoring-cv", "generate-optimize-cv", "generate-cover-letter"],
            ],
            msg: "feature must be scoring-cv, generate-optimize-cv, or generate-cover-letter",
          },
        },
      },
      data: {
        type: Sequelize.JSONB,
        defaultValue: "{}",
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
    await queryInterface.dropTable("results");
  },
};
