import {Request, Response} from "express";
import { PostService } from "../services/post.service";
import {IPost} from "../intefaces/IPost";

class PostController{
    private postService:PostService;

    constructor() {
        this.postService = new PostService();
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.post = this.post.bind(this);
    }
    async getAll( _: Request, res: Response) {
        try{
            const posts = await this.postService.getAll();
            res.json(posts);
        }catch (e){
            throw e;
        }
    }

    async getOne(req: Request, res: Response) {
        try{
            const post:IPost|null = await this.postService.getOne(+req.params.id);
            res.json(post);
        }catch (e){
            throw e
        }
    }


    async post(req: Request,res: Response) {
        try{
            const post:IPost= await this.postService.post(req.body, req.files?.image as any) 
            res.json(post);
        }catch (e){
            throw e ;
        }
    }

    put() {
        return 'Updating a user...';
    }

    remove() {
        return 'Removing user...';
    }
}

export default PostController
