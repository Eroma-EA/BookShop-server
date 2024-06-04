import express, { Router } from "express";
import userRouter from "./user.router";
import postRouter from "./post.router";
import authRouter from "./auth.router";
import commentRouter from "./comment.router";
import productRouter from "./product.router";
import reviewRouter from "./review.router";
import likedRouter from "./liked.router";

const router = Router();

router.use("/users", userRouter);
router.use("/posts", postRouter);
router.use("/auth", authRouter);
router.use("/comments", commentRouter);
router.use("/products", productRouter);
router.use("/reviews", reviewRouter);
router.use("/liked", likedRouter);

//routes to get images
router.use("/public/products", express.static("public/products"));

export default router;
