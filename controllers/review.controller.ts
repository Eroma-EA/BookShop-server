import {Request, Response} from "express";
import { ReviewService } from "../services/review.service";
import { IReview } from "../intefaces/IReview"; 

export class ReviewController{
    private reviewService;
    constructor(){
        this.reviewService = new ReviewService();
        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
    }


    async create(req:Request, res:Response){
        try{
            const review:IReview = req.body;
            const createdReview = await this.reviewService.create(review);
            return res.status(201).json(createdReview);
        } catch (error:any){
            return res.status(500).json(getErrorMessage(error));
        }
    }

    async getAll(req:Request, res:Response){
        try{
            const reviews = await this.reviewService.getAll(+req.params.id);
            return res.status(200).json(reviews);
        } catch (error:any){
            return res.status(500).json(getErrorMessage(error));
        }
    }

    async getOne(req:Request, res:Response){
        try{
            const reviewId = req.params.id;
            const review = await this.reviewService.getOne(+reviewId);
            return res.status(200).json(review);
        } catch (error:any){
            return res.status(500).json(getErrorMessage(error));
        }
    }

    async update(req:Request, res:Response){
        try{
            const reviewId = req.params.id;
            const review:IReview = req.body;
            const updatedReview = await this.reviewService.update(review);
            return res.status(200).json(updatedReview);
        } catch (error:any){
            return res.status(500).json(getErrorMessage(error));
        }
    }

    async remove(req:Request, res:Response){
        try{
            const reviewId = req.params.id;
            await this.reviewService.remove(+reviewId);
            return res.status(204).send();
        } catch (error:any){
            return res.status(500).json(getErrorMessage(error));
        }
    }
}

function getErrorMessage(error:Error):string{
    return (error as any).message || "Unexpected error";
}
