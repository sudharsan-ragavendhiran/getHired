import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes/index.js";


const app = express();

mongoose.connect("mongodb://0.0.0.0:27017/getHireddb");

app.use(express.json());

app.use(express.urlencoded());


app.use(cors());

routes(app);

export default app;
