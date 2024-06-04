import { Op, WhereOptions, where } from "sequelize";
import { ILiked } from "../intefaces/ILiked";
import { LikedModel } from "../models/liked.model";
import { log } from "console";

export class LikedService {
  async create(data: ILiked) {
    await LikedModel.create(data);
    const likes = await LikedModel.findAll({ where: { userId: data.userId } });
    return likes;
  }
  async findAll(userId: number) {
    return await LikedModel.findAll({ where: { userId: userId } });
  }
  async findOne(id: number) {
    return await LikedModel.findByPk(id);
  }
  async update(id: number, data: ILiked) {
    const options: LikedModel | null = await LikedModel.findByPk(id);
    if (!options) throw new Error("liked not found");
    Object.assign(options, data);
    await options.save();
    return options;
  }
  async delete(likedId: string[]) {
    const options: LikedModel | null = await LikedModel.findOne({
      where: { productId: +likedId[0], userId: +likedId[1] },
    });
    if (!options) throw new Error("liked not found");
    await options.destroy();
    const deleted: LikedModel | null = await LikedModel.findOne({
      where: { productId: +likedId[0], userId: +likedId[1] },
    });
    if (deleted) throw new Error("liked not deleted");
    const likes = await LikedModel.findAll({ where: { userId: +likedId[1] } });
    return likes;
  }
}
