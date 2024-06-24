import { Router } from "express";
import UserCTL from "../controller/users.js";
import UserMDW from "../middleware/users.js";

const userRouter = Router();

userRouter.post('/signup', UserMDW.checkSignUp,UserCTL.signup)
userRouter.post("/login");

export default userRouter;