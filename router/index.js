import { Router } from "express";
import userRouter from "./users.js";
import testRouter from "./tests.js";

const router = Router()
router.use('/users', userRouter)
router.use("/tests", testRouter);


export default router;