import { Router } from "express";
import UserCTL from "../../controller/users/index.js";

const userRouter =  Router();

userRouter.post('/signup',UserCTL.signup);
userRouter.post('/login',UserCTL.login);
userRouter.put('/:userId',UserCTL.update);

export default userRouter;