import { Router } from "express";
import { LikedController } from "../controllers/liked.controller";

const likedRouter = Router();

likedRouter.get("/:id", new LikedController().getAll);
likedRouter.get("/like/:id", new LikedController().getOne);
likedRouter.post("/", new LikedController().create);
likedRouter.put("/:id", new LikedController().update);
likedRouter.delete("/:id", new LikedController().remove);

export default likedRouter;
