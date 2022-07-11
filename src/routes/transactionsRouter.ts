import { Router } from "express";
import { purchase, rechargeCard } from "../controllers/transactionsController.js";
import { vaerifyAmount } from "../middlewares/transactionsMIddleware.js";

const transactionRouter = Router();

transactionRouter.post('/transactions/recharge', vaerifyAmount, rechargeCard);
transactionRouter.post('/transactions/purchase', vaerifyAmount, purchase);


export default transactionRouter;