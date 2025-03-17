import { DataTypes, Model, Sequelize } from "sequelize";

export interface GenerateProfileAttributes {
  id: number;
  free_points: number;
  paid_points: number;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

export class GenerateProfile
  extends Model<GenerateProfileAttributes, Partial<GenerateProfileAttributes>>
  implements GenerateProfileAttributes
{
  declare id: number;
  declare free_points: number;
  declare paid_points: number;
  declare user_id: string;
  declare created_at: Date;
  declare updated_at: Date;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        free_points: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 3,
        },
        paid_points: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0.0,
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
