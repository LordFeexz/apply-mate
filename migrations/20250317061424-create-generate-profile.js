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
      points: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 3,
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
      premium_start_date: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      premium_end_date: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
        validate: {
          isAfter: {
            args: ["premium_start_date"],
            msg: "premium_end_date must be after premium_start_date",
          },
        },
      },
      pay_as_you_go_payments: {
        // kalau feature nya ada di dalam array nya maka valid
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
        defaultValue: [],
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("generate_profiles");
  },
};
