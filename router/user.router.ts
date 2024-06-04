import {Router} from "express";
import UserController from "../controllers/user.controller";

const userRouter= Router();


userRouter.get("/", new UserController().getAll );
userRouter.post("/", new UserController().post );
userRouter.get("/:id", new UserController().getOne );


export default userRouter;