import {
    BelongsTo,
    Column,
    DataType, ForeignKey,
    Model,
    Table,
} from "sequelize-typescript";
import {UserModel} from "./user.model";
import { PostModel } from "./post.model";
import { IComment } from "../intefaces/IComment";
// import {IPost} from "../intefaces/IPost";

interface CommentCreationAttrs {
    title: string;
    content: string;
    postId?: number;
    userId: number;
}

@Table({ tableName: "comments" })
export class CommentModel extends Model<IComment, CommentCreationAttrs> {
      @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        field:"id"
    })
    id?: number;

    @Column({ type: DataType.STRING, allowNull: false, field:"title" })
    title!: string;

    @Column({ type: DataType.STRING, allowNull: false, field:"content" })
    content!: string;

    @ForeignKey(() => PostModel)
    @Column({ type: DataType.INTEGER })
    postId!: number;

    @ForeignKey(() => UserModel)
    @Column({ type: DataType.INTEGER })
    userId!: number;

    @BelongsTo(() => PostModel)
    post!: string;

    @BelongsTo(() => UserModel)
    author!: string;
}