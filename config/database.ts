import { Sequelize } from "sequelize-typescript";
import { sequelizeConfig, dialect } from "./config";
import { UserModel } from "../models/user.model";
import { PostModel } from "../models/post.model";
import { CommentModel } from "../models/comment.model";
import { ProductModel } from "../models/product.model";
import { ReviewModel } from "../models/reviews.model";
import { LikedModel } from "../models/liked.model";

class Database {
  public sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize({
      database: sequelizeConfig.database,
      username: sequelizeConfig.username,
      password: sequelizeConfig.password,
      host: sequelizeConfig.options.host,
      dialect: dialect,
      pool: {
        max: sequelizeConfig.options.pool.max,
        min: sequelizeConfig.options.pool.min,
        acquire: sequelizeConfig.options.pool.acquire,
        idle: sequelizeConfig.options.pool.idle,
      },
      models: [UserModel, PostModel, CommentModel, ProductModel, ReviewModel, LikedModel],
    });
  }

  public async connectToDatabase(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      await this.sequelize.sync({ force: false });
      // console.log("Connection has been established successfully.");
    } catch (err) {
      // console.error("Unable to connect to the Database:", err);
    }
  }
}

export default new Database();
