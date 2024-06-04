import {IUser} from "../intefaces/IUser";
import {UserModel} from "../models/user.model";

export class UserService {
  async getAll() {
   try{
     const users:IUser[]=await UserModel.findAll();
     return users
   }catch (e){
     throw e
   }
  }

  async getOne(user:IUser) {
    const getUser:IUser | null = await UserModel.findOne({where:{email:user.email}});
    // console.log(getUser);
    
    return getUser;
  }

  async getById(id:number) {
    const getUser:IUser | null = await UserModel.findByPk(id);
    
    return getUser;
  }

  async post(user:IUser) {
    const newUser:IUser = await UserModel.create({email:user.email, password:user.password});
    return newUser;
  }

  put() {
    return "Updating a user...";  
  }

  remove() {
    return "Removing user...";
  }
}
