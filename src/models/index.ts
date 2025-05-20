import "server-only";
import { Sequelize } from "sequelize";
import conf from "../config/config.json";
import "pg";
import "pg-hstore";
import { User } from "./user";
import { GenerateProfile } from "./generate_profile";
import { Transaction } from "./transaction";
import { Result } from "./result";

let sequelize: Sequelize;

if (process.env.NODE_ENV === "production") {
  const url = process.env[conf.production.use_env_variable] as string;
  if (!url) throw new Error("DATABASE_URL must be set");

  sequelize = new Sequelize(url, {
    timezone: "+07:00",
    pool: {
      max: 20,
      idle: 10000,
      acquire: 30000,
    },
    logging: false,
    dialect: "postgres",
  });
} else {
  const devMode = conf.development;
  sequelize = new Sequelize(
    devMode.database,
    devMode.username,
    devMode.password,
    {
      timezone: "+07:00",
      dialect: "postgres",
      pool: {
        max: 20,
        idle: 10000,
        acquire: 30000,
      },
      logging: false,
    }
  );
}

let models = [User, GenerateProfile, Transaction, Result];

models.forEach((model) => model.initialize(sequelize));

User.hasOne(GenerateProfile, { foreignKey: "user_id" });
User.hasMany(Transaction, { foreignKey: "user_id" });
User.hasMany(Result, { foreignKey: "user_id" });
GenerateProfile.belongsTo(User, { foreignKey: "user_id" });
Transaction.belongsTo(User, { foreignKey: "user_id" });
Result.belongsTo(User, { foreignKey: "user_id" });

export { sequelize as DB, User, GenerateProfile, Transaction, Result };
