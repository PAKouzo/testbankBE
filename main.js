import express from "express";
import router from "./router";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const {PORT} = process.env;

app.use('/', router)

app.listen(PORT, () => {
  console.log("Server is running!");
});
