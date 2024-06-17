import express from "express";
import router from "./router/index.js";
import dotenv from "dotenv";
import userRouter from "./router/users/index.js";

dotenv.config();

const app = express();
const {PORT} = process.env;

app.use('/', router);
app.use('/user', userRouter );

app.listen(PORT, () => {
  console.log("Server is running!");
});
