import express from "express";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import cors from "cors";
import { connectMongoDb } from "./database/db";
import categoriesRouter from "./routes/categories.route";
import foodsInfoRoute from "./routes/foodsInfo.route";
import userRoute from "./routes/auth.route";

configDotenv();
const app = express();
connectMongoDb();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());
app.use("/categories", categoriesRouter);
app.use("/foodsInfo", foodsInfoRoute);
app.use("/auth", userRoute);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});