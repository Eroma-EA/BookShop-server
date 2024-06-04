import { ReviewModel } from "../models/reviews.model";
import { IReview } from "../intefaces/IReview";
import { UserModel } from "../models/user.model";

export class ReviewService {
  async getAll(productId: number) {
    const reviews: IReview[] = await ReviewModel.findAll({
      where: { productId },
    });

    if (!reviews.length) {
      throw new Error("Reviews not found");
    }

    interface REVIEW extends IReview {
      id: number;
      user: string | null;
    }

    const getUsers: Promise<REVIEW>[] = reviews.map(async (review) => {
      const user = await UserModel.findOne({ where: { id: review.userId } });
      const populatedReview: REVIEW = {
        id: review.id || 0,
        userId: review.userId,
        content: review.content,
        productId: review.productId,
        user: user?.email || null,
      };
      return populatedReview;
    });

    const populatedReviews = await Promise.all(getUsers);

    return populatedReviews;
  }

  async getOne(id: number) {
    const review = await ReviewModel.findOne({
      where: { id },
    });
    return review;
  }

  async create(reviewData: IReview) {
    return await ReviewModel.create(reviewData);
  }

  async update(reviewData: IReview) {
    const review = await ReviewModel.findOne({
      where: { id: reviewData.id },
    });

    if (!review) {
      return null;
    }

    Object.assign(review, reviewData);
    await review.save();
    return review;
  }

  async remove(id: number) {
    const review = await ReviewModel.findOne({
      where: { id },
    });
    if (!review) {
      return null;
    }
    await review.destroy();
    return review;
  }
}
