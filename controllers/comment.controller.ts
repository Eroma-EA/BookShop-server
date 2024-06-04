import { Request, Response } from "express";
import { CommentService } from "../services/comment.service";

class CommentController{
    private commentService;
    constructor(){
        this.commentService = new CommentService();
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.create = this.create.bind(this);
    }
    async create(req:Request, res:Response) {
        try {
            const comment = await this.commentService.create(req.body);
            res.json(comment);
        }catch(e){
            throw e
        }
    }

    async getAll(_:Request, res:Response) {
        const comments = await this.commentService.getAll();
        res.json(comments)
    }
    async getOne(req:Request, res:Response) {
        try {
            const comment = await this.commentService.getOne(+req.params.id);
            res.json(comment);
        }catch(e){
            throw e
        }
    }

    async update(req:Request, res:Response) {
        
    }

    async remove(req:Request, res:Response) {
        
    }

    
}

export default CommentController;