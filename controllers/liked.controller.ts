import { Request, Response } from "express";
import { LikedService } from "../services/liked.service";
import { ILiked } from "../intefaces/ILiked";

export class LikedController {
  private likedService;
  constructor() {
    this.likedService = new LikedService();
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
  }

  async create(req: Request, res: Response) {
    try {
      const liked: ILiked = req.body;
      const createdLiked = await this.likedService.create(liked);
      return res.status(201).json(createdLiked);
    } catch (error) {
      return res.status(500).json(getErrorMessage(error));
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const likeds = await this.likedService.findAll(+userId);
      return res.status(200).json(likeds);
    } catch (error) {
      return res.status(500).json(getErrorMessage(error));
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const likedId = req.params.id;
      const liked = await this.likedService.findOne(+likedId);
      return res.status(200).json(liked);
    } catch (error) {
      return res.status(500).json(getErrorMessage(error));
    }
  }

  async update(req: Request, res: Response) {
    try {
      const likedId = req.params.id;
      const liked: ILiked = req.body;
      const updatedLiked = await this.likedService.update(+likedId, liked);
      return res.status(200).json(updatedLiked);
    } catch (error) {
      return res.status(500).json(getErrorMessage(error));
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const likedId = req.params.id.split("=");
      await this.likedService.delete(likedId);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json(getErrorMessage(error));
    }
  }
}

function getErrorMessage(error: any): string {
  return (error as any).message || "Unexpected error";
}
