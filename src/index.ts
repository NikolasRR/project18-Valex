import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import chalk from "chalk";
import "express-async-errors";

import cardsRouter from "./routes/cardsRouter.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

app.use(json());
app.use(cors());
app.use(cardsRouter);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(chalk.bold.blue(`Server is up on port: ${port}`));
});