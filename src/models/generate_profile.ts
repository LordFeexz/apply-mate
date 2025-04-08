import "server-only";
import type { PAYG_PAYMENT } from "@/enums/global";
import { DataTypes, Model, Sequelize } from "sequelize";

export interface GenerateProfileAttributes {
  id: number;
  points: number;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  premium_start_date: Date | null;
  premium_end_date: Date | null;
  pay_as_you_go_payments: PAYG_PAYMENT[];
}

export class GenerateProfile
  extends Model<GenerateProfileAttributes, Partial<GenerateProfileAttributes>>
  implements GenerateProfileAttributes
{
  declare id: number;
  declare points: number;
  declare user_id: string;
  declare created_at: Date;
  declare updated_at: Date;
  declare premium_start_date: Date | null;
  declare premium_end_date: Date | null;
  declare pay_as_you_go_payments: PAYG_PAYMENT[];

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        points: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 3,
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
          unique: true,
        },
        created_at: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updated_at: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        premium_start_date: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: null,
        },
        premium_end_date: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: null,
        },
        pay_as_you_go_payments: {
          // kalau feature nya ada di dalam array nya maka valid
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true,
          defaultValue: [],
        },
      },
      {
        sequelize,
        underscored: true,
        modelName: "generate_profiles",
        tableName: "generate_profiles",
      }
    );
  }
}
