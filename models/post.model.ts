import {
    BelongsTo,
    Column,
    DataType, ForeignKey,
    Model,
    Table,
} from "sequelize-typescript";
import {UserModel} from "./user.model";
import {IPost} from "../intefaces/IPost";

interface PostCreationAttrs {
    title: string;
    content: string;
    userId: number;
    image?: string;
}

@Table({ tableName: "posts" })
export class PostModel extends Model<IPost, PostCreationAttrs> {
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

    @Column({ type: DataType.STRING, allowNull: false, field:"image" })
    image?: string;

    @ForeignKey(() => UserModel)
    @Column({ type: DataType.INTEGER })
    userId!: number;

    @BelongsTo(() => UserModel)
    author!: string;
}