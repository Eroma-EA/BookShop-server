import { Request, Response } from "express";
import { ProductService } from "../services/product.service";

class ProductController {
  private productService;
  constructor() {
    this.productService = new ProductService();
    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
    this.getByCategory = this.getByCategory.bind(this);
    this.getSearch = this.getSearch.bind(this);
    // this.getCategory = this.getCategory.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    this.create = this.create.bind(this);
    this.createMore = this.createMore.bind(this);
  }
  async create(req: Request, res: Response) {
    try {
      const result = await this.productService.create(req.body);
      res.status(201).send(result);
    } catch (e) {
      res.status(400).send("Bad request");
    }
  }

  async createMore(req: Request, res: Response) {
    try {
      const result = await this.productService.createMore(req.body);
      res.status(201).send(result);
    } catch (e) {
      res.status(400).send("Bad request");
    }
  }
  async getAll(req: Request, res: Response) {
    try {
      const result = await this.productService.getAll();
      res.status(200).send(result);
    } catch (e) {
      res.status(400).send("Bad request");
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const result = await this.productService.getOne(+req.params.id);
      res.status(200).send(result);
    } catch (e) {
      res.status(400).send("Bad request");
    }
  }

  async getByCategory(req: Request, res: Response) {
    try {
      const result = await this.productService.getByCategory(req.params.category);
      res.status(200).send(result);
    } catch (e) {
      res.status(400).send("Bad request");
    }
  }

  async getSearch(req: Request, res: Response) {
    try {
      const result = await this.productService.getSearch(req.params.search);
      res.status(200).send(result);
    } catch (e) {
      res.status(400).send("Bad request");
    }
  }

  //  async getCategory(req: Request, res: Response) {
  //   try {
  //     const result = await this.productService.getCategory();
  //     res.status(200).send(result);
  //   } catch (e) {
  //     console.log(e)
  //     res.status(400).send(e);
  //   }
  // }

  async update(req: Request, res: Response) {}
  async remove(req: Request, res: Response) {}
}

export default ProductController;
