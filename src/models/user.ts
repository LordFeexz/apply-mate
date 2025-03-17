import { Model, Sequelize, DataTypes } from "sequelize";

export interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
  verified: boolean;
  created_at: Date;
  updated_at: Date;
}

export class User
  extends Model<UserAttributes, Partial<UserAttributes>>
  implements UserAttributes
{
  declare id: string;
  declare name: string;
  declare email: string;
  declare password: string;
  declare verified: boolean;
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
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: "name is required",
            },
            notEmpty: {
              msg: "name is required",
            },
          },
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: "email is required",
            },
            notEmpty: {
              msg: "email is required",
            },
            isEmail: {
              msg: "email is invalid",
            },
          },
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: "password is required",
            },
            notEmpty: {
              msg: "password is required",
            },
          },
        },
        verified: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      { sequelize, underscored: true, modelName: "users", tableName: "users" }
    );
  }
}
