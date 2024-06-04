import {Router} from "express";
import {AuthController} from "../controllers/auth.controller";

const authRouter= Router();


authRouter.post("/login", new AuthController().login );
authRouter.get("/tokenIsValid", new AuthController().tokenIsValid );
authRouter.post("/registration", new AuthController().registration );
authRouter.post("/logout", new AuthController().logout );


export default authRouter;