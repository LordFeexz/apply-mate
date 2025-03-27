import "server-only";
import { DataTypes, Model, Sequelize } from "sequelize";
import type { EWalletActionResp } from "midtrans-client";
import type { ITEM } from "@/enums/plan";

export type TransactionType = "topup" | "payment" | "refund" | "settlement";

export type Currency = "IDR" | "USD";

export type PaymentMethod =
  | "Bank Transfer"
  | "Credit Card"
  | "EWallet"
  | "Point";

export type TransactionStatus =
  | "pending"
  | "completed"
  | "failed"
  | "cancel"
  | "refund"
  | "settlement"
  | "deny"
  | "expire";

export const TRANSACTION_STATUS: TransactionStatus[] = [
  "pending",
  "completed",
  "failed",
  "cancel",
  "refund",
  "settlement",
  "deny",
  "expire",
];

export const TRANSACTION_TYPE: TransactionType[] = [
  "topup",
  "payment",
  "refund",
];

export interface SubscriptionTransactionDetail {
  type: "va" | "e-wallet";
  feature:
    | "scoring-cv"
    | "generate-optimize-cv"
    | "generate-cover-letter"
    | "none";
  provider: "BNI" | "BRI" | "MANDIRI" | "BCA" | "PERMATA" | "Gopay";
  va_number: string[];
  actions: EWalletActionResp[];
  item: ITEM.SUBSCRIPTION;
  order_id: string;
}

export type TransactionDetail = Record<string, any> &
  SubscriptionTransactionDetail;

export const TRANSACTION_CURRENCY: Currency[] = ["IDR", "USD"];

export interface TransactionAttributes {
  id: string;
  user_id: string;
  amount: number;
  transaction_type: TransactionType;
  currency: Currency;
  status: TransactionStatus;
  description?: string;
  detail?: Record<string, any>;
  signature: string;
  fee: number;
  tax: number;
  created_at: Date;
  updated_at: Date;
}

export class Transaction
  extends Model<TransactionAttributes, Partial<TransactionAttributes>>
  implements TransactionAttributes
{
  declare id: string;
  declare user_id: string;
  declare amount: number;
  declare transaction_type: TransactionType;
  declare currency: Currency;
  declare status: TransactionStatus;
  declare description?: string;
  declare detail?: Record<string, any>;
  declare signature: string;
  declare fee: number;
  declare tax: number;
  declare created_at: Date;
  declare updated_at: Date;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.UUID,
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
          type: DataTypes.FLOAT,
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
          type: DataTypes.ENUM("topup", "payment", "refund", "settlement"),
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
          type: DataTypes.ENUM("USD", "IDR"),
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
          type: DataTypes.ENUM(
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
          type: DataTypes.TEXT,
          allowNull: true,
          defaultValue: null,
        },
        detail: {
          type: DataTypes.JSONB,
          allowNull: true,
          defaultValue: null,
        },
        signature: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: "signature is required",
            },
            notEmpty: {
              msg: "signature is required",
            },
          },
        },
        fee: {
          type: DataTypes.FLOAT,
          allowNull: false,
          defaultValue: 0,
        },
        tax: {
          type: DataTypes.FLOAT,
          allowNull: false,
          defaultValue: 0,
        },
        created_at: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updated_at: {
          allowNull: false,
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
        modelName: "transactions",
        tableName: "transactions",
        underscored: true,
      }
    );
  }
}
