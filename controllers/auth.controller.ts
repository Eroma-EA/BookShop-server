import {Request, Response} from "express";
import {AuthService} from "../services/auth.service";
import {getErrorMessage} from "../utils/get.error";

export class AuthController{
    private authService
    constructor() {
        this.authService=new AuthService()
        this.login = this.login.bind(this);
        this.registration = this.registration.bind(this);
        this.tokenIsValid = this.tokenIsValid.bind(this);
        this.logout = this.logout.bind(this);
    }

    async login (req: Request, res: Response): Promise<void> {
        try {
            const foundUser = await this.authService.login(req.body);
            res.status(200).json(foundUser);
        } catch (error) {
            res.status(500).send(getErrorMessage(error));
        }
    };

    async tokenIsValid(req:Request, res:Response){
        try {
            // console.log(req.headers.authorization);
            
            const result = await this.authService.tokenIsValid(req.headers.authorization!);
            res.status(200).json(result);
        } catch (error) {
            return res.status(500).send(getErrorMessage(error));
        }
    }

    async registration(req:Request, res:Response){
        try {
            await this.authService.registration(req.body);
            res.status(200).send('Inserted successfully');
        } catch (error) {
            return res.status(500).send(getErrorMessage(error));
        }
    }

    async logout(req:Request, res:Response){
        try {
            await this.authService.logout(req.body);
            res.status(200).send('Logged out successfully');
        } catch (error) {
            return res.status(500).send(getErrorMessage(error));
        }
    }

}