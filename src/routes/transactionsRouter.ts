import { Router } from "express";
import { rechargeCard } from "../controllers/transactionsController.js";
import { verifyRechargeValue } from "../middlewares/transactionsMIddleware.js";

const transactionRouter = Router();

transactionRouter.post('/transactions/recharge', verifyRechargeValue, rechargeCard);


export default transactionRouter;