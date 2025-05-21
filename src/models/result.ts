import type { FEATURE } from "@/enums/global";
import { DataTypes, Model, Sequelize } from "sequelize";

export interface ResultAttributes {
  id: string;
  user_id: string | null;
  feature: FEATURE;
  data: Record<string, any>;
  user_input: Record<string, any>;
  created_at: Date | string;
  updated_at: Date | string;
}

export class Result
  extends Model<ResultAttributes, Partial<ResultAttributes>>
  implements ResultAttributes
{
  declare id: string;
  declare user_id: string | null;
  declare feature: FEATURE;
  declare data: Record<string, any>;
  declare user_input: Record<string, any>;
  declare created_at: string;
  declare updated_at: string;

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
        feature: {
          type: DataTypes.ENUM(
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
          type: DataTypes.JSONB,
          defaultValue: "{}",
        },
        user_input: {
          type: DataTypes.JSONB,
          defaultValue: "{}",
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
        modelName: "results",
        tableName: "results",
        underscored: true,
      }
    );
  }
}
