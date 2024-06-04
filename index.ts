import express from "express";
import * as dotenv from "dotenv";
import database from "./config/database";
import router from "./router";
import fileUpload = require("express-fileupload");
import ProductController from "./controllers/product.controller";
import { ProductService } from "./services/product.service";
dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
// Add CORS headers middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(fileUpload({ createParentPath: true }));
app.use(express.json());
app.get("/api/products/categories", async (req, res) => {
  const service = new ProductService();
  const categories = await service.getCategory();
  res.send(categories);
});
app.use("/api", router);

database
  .connectToDatabase()
  .then(() => {
    // console.log("Database connection successfully.");
    app.listen(port, () => {
      console.log(`[server]:🧙🏻‍♂️ Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    // console.error("Failed to connect to the database:", err);
    process.exit(1);
  });
