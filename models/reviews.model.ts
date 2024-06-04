import {
    BelongsTo,
    Column,
    DataType, ForeignKey,
    Model,
    Table,
} from "sequelize-typescript";
import {UserModel} from "./user.model";
// import { PostModel } from "./post.model";
import { IReview } from "../intefaces/IReview";
import { ProductModel } from "./product.model";
// import {IPost} from "../intefaces/IPost";

interface ReviewCreationAttrs {
    content: string;
    productId: number;
    userId: number;
}

@Table({ tableName: "reviews" })
export class ReviewModel extends Model<IReview, ReviewCreationAttrs> {
      @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        field:"id"
    })
    id?: number;

    @Column({ type: DataType.STRING, allowNull: false, field:"content" })
    content!: string;

    @ForeignKey(() => ProductModel)
    @Column({ type: DataType.INTEGER })
    productId!: number;

    @ForeignKey(() => UserModel)
    @Column({ type: DataType.INTEGER })
    userId!: number;

    @BelongsTo(() => ProductModel)
    product!: string;

    @BelongsTo(() => UserModel)
    author!: string;
}