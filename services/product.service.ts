import { Op } from "sequelize";
import { IProduct } from "../intefaces/IProduct";
import { ProductModel } from "../models/product.model";
import { FileService } from "./file.service";

export class ProductService {
  async getAll() {
    try {
      const products: IProduct[] = await ProductModel.findAll();
      if (!products) throw new Error("products not found");
      return products;
    } catch (e) {
      throw e;
    }
  }

  async getOne(id: number) {
    try {
      const product: IProduct | null = await ProductModel.findByPk(id);
      return product;
    } catch (e) {
      throw new Error("product not found");
    }
  }

  async create(productData: IProduct, picture?: any) {
    const img = picture ? await new FileService().saveFile(picture) : "";
    const newproduct = await ProductModel.create({
      ...productData,
      img,
    });

    return newproduct;
  }
  async createMore(productData: IProduct[]) {
    const newproducts = productData.map(async (product) => await ProductModel.create(product));
    return newproducts;
  }

  async getByCategory(category: string) {
    const products: IProduct[] = await ProductModel.findAll({
      where: { genre: category },
    });
    if (!products) throw new Error("products not found");
    return products;
  }

  async getCategory() {
    const products: IProduct[] = await ProductModel.findAll();
    if (!products) {
      throw new Error("products not found");
    }

    const categories = products
      .map((product) => product.genre)
      .sort()
      .filter((p, i, self) => self[i - 1] !== p);

    // if (!categories) throw new Error("categories not found");
    return categories;
  }

  async getSearch(search: string) {
    const products: IProduct[] = await ProductModel.findAll();

    if (!products) throw new Error("products not found");
    products.filter((product) => product.name.includes(search));
    return products;
  }

  put() {
    return "Updating a user...";
  }

  remove() {
    return "Removing user...";
  }
}
