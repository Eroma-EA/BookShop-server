import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserModel } from "./user.model";
import { IProduct } from "../intefaces/IProduct";

interface ProductCreationAttrs {
  name: string;
  author_books: string;
  img?: string;
  userId: number;
}

@Table({ tableName: "products" })
export class ProductModel extends Model<IProduct, ProductCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,  
    primaryKey: true,
    field: "id",
  })
  id?: number;

  @Column({ type: DataType.STRING, allowNull: false, field: "name" })
  name!: string;

  @Column({ type: DataType.STRING, allowNull: false, field: "author_books" })
  author_books!: string;

  @Column({ type: DataType.INTEGER, allowNull: false, field: "price" })
  price!: number;

  @Column({ type: DataType.TEXT, allowNull: false, field: "description" })
  description!: string;

  @Column({ type: DataType.STRING, allowNull: false, field: "genre" })
  genre!: string;

  @Column({ type: DataType.STRING, allowNull: false, field: "img" })
  img?: string;

  @Column({ type: DataType.INTEGER, allowNull: false, field: "year" })
  year!: number;


  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER })
  userId!: number;


  @BelongsTo(() => UserModel)
  author!: string;
}
