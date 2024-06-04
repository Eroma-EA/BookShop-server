import {Router} from "express";
import { ReviewController } from "../controllers/review.controller";
const reviewRouter=Router();

reviewRouter.post("/", new ReviewController().create);
reviewRouter.get("/:id", new ReviewController().getAll);
reviewRouter.get("/review/:id", new ReviewController().getOne);
reviewRouter.put("/:id", new ReviewController().update);
reviewRouter.delete("/:id", new ReviewController().remove);

export default reviewRouter;

