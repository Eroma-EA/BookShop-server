import { CommentModel } from "../models/comment.model"
import { IComment } from "../intefaces/IComment"
// import { FileService } from "./file.service";


export class CommentService {
    async getAll() {
        try{
            const comments:IComment[] =await CommentModel.findAll();
            return comments
        }catch (e){
            throw e
        }
    }

    async getOne(id: number) {
        try{
            const comment:IComment|null = await CommentModel.findByPk(id)
            return comment
        }catch (e){
            throw new Error("comment not found")
        }
    }


    async create(commentData:IComment) {
        
        const newComment = await CommentModel.create(commentData)
        return newComment;
    }


    put() {
        return "Updating a user...";
    }

    remove() {
        return "Removing user...";
    }
}