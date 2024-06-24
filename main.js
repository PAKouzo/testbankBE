import express from "express";
import router from "./router/index.js";
import dotenv from "dotenv";
import mongoose from 'mongoose'

dotenv.config();

const app = express();
const {PORT, DB_URL} = process.env;

app.use(express.json())
mongoose.connect(DB_URL).then(()=>{
  console.log("Connection successful")
});

app.use('/', router)

app.listen(PORT, () => {
  console.log("Server is running!");
});
