import { Router } from "express";
import CommentController from "../controllers/comment.controller";
const commentRouter = Router();
commentRouter.post("/", new CommentController().create);
commentRouter.get("/", new CommentController().getAll);
commentRouter.get("/:id", new CommentController().getOne);
commentRouter.delete("/:id", new CommentController().remove);
export default commentRouter;
