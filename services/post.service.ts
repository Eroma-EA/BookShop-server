import {PostModel} from "../models/post.model";
import {IPost} from "../intefaces/IPost";
import { FileService } from "./file.service";


export class PostService{
    async getAll() {
        try{
            const posts:IPost[] =await PostModel.findAll()
            return posts
        }catch (e){
            throw e
        }
    }

    async getOne(id: number) {
        try{
            const post:IPost|null = await PostModel.findByPk(id)
            return post
        }catch (e){
            throw new Error("Post not found")
        }
    }


    async post(postData:IPost, picture?: any) {
        const image = picture ? await new FileService().saveFile(picture) : "";

        const newPost = await PostModel.create({
            ...postData,
            image,
        });

        return newPost;
    }


    put() {
        return "Updating a user...";
    }

    remove() {
        return "Removing user...";
    }
}