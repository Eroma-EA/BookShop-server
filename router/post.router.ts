import { Router } from "express";
import PostController from "../controllers/post.controller";

const postRouter = Router();

postRouter.get("/", new PostController().getAll);
postRouter.post("/", new PostController().post);

export default postRouter;
