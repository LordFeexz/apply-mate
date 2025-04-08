"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("transactions", {
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
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "amount is required",
          },
          notEmpty: {
            msg: "amount is required",
          },
        },
      },
      transaction_type: {
        type: Sequelize.ENUM("topup", "payment", "refund", "settlement"),
        allowNull: false,
        validate: {
          notNull: {
            msg: "transaction_type is required",
          },
          notEmpty: {
            msg: "transaction_type is required",
          },
          isIn: {
            args: [["topup", "payment", "refund", "settlement"]],
            msg: "transaction_type must be topup, payment, refund, or settlement",
          },
        },
        values: ["topup", "payment", "refund", "settlement"],
      },
      currency: {
        type: Sequelize.ENUM("USD", "IDR"),
        allowNull: false,
        validate: {
          notNull: {
            msg: "currency is required",
          },
          notEmpty: {
            msg: "currency is required",
          },
          isIn: {
            args: [["USD", "IDR"]],
            msg: "currency must be USD or IDR",
          },
        },
        values: ["USD", "IDR"],
      },
      status: {
        type: Sequelize.ENUM(
          "pending",
          "completed",
          "failed",
          "cancel",
          "refund",
          "settlement",
          "deny",
          "expire"
        ),
        validate: {
          isIn: {
            args: [
              [
                "pending",
                "completed",
                "failed",
                "cancel",
                "refund",
                "settlement",
                "deny",
                "expire",
              ],
            ],
            msg: "status must be pending, completed, failed, cancel, refund, settlement, deny, or expire",
          },
          notNull: {
            msg: "status is required",
          },
          notEmpty: {
            msg: "status is required",
          },
        },
        defaultValue: "pending",
        allowNull: false,
        values: [
          "pending",
          "completed",
          "failed",
          "cancel",
          "refund",
          "settlement",
          "deny",
          "expire",
        ],
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      detail: {
        type: Sequelize.JSONB,
        allowNull: true,
        defaultValue: null,
      },
      order_id: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "order_id is required",
          },
          notEmpty: {
            msg: "order_id is required",
          },
        },
      },
      fee: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      tax: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
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
    await queryInterface.dropTable("transactions");
  },
};
