import { Router } from "express";
import ProductController from "../controllers/product.controller";
const productRouter = Router();

productRouter.post("/", new ProductController().create);
productRouter.post("/more", new ProductController().createMore);
productRouter.get("/", new ProductController().getAll);
productRouter.get("/:id", new ProductController().getOne);
productRouter.get("/category/:category", new ProductController().getByCategory);
productRouter.get("/search/:search", new ProductController().getSearch);
// productRouter.get("/categories", new ProductController().getCategory);
productRouter.delete("/:id", new ProductController().remove);
productRouter.put("/:id", new ProductController().update);

export default productRouter;
