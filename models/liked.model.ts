import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserModel } from "./user.model";
import { ProductModel } from "./product.model";
import { ILiked } from "../intefaces/ILiked";

interface ILikedCreaditionAttrs {
  productId: number;
  userId: number;
}

@Table({ tableName: "liked" })
export class LikedModel extends Model<ILiked, ILikedCreaditionAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    field: "id",
  })
  id?: number;

  @ForeignKey(() => ProductModel)
  @Column({ type: DataType.INTEGER })
  productId!: number;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER })
  userId!: number;

  @BelongsTo(() => ProductModel)
  product!: string;

  @BelongsTo(() => UserModel)
  user!: string;
}
