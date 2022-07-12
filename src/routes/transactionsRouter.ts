import { Router } from "express";
import * as controllers from "../controllers/transactionsController.js";
import * as middleware from "../middlewares/transactionsMIddleware.js";

const transactionRouter = Router();

transactionRouter.post('/transactions/recharge', middleware.verifyCompanyKey, middleware.verifyIdAndAmount, middleware.verifyAmount, controllers.rechargeCard);
transactionRouter.post('/transactions/purchase', middleware.verifyPurchaseData, middleware.verifyAmount, controllers.purchase);
transactionRouter.get('/transactions/statement', middleware.verifyCardId, controllers.getStatement);


export default transactionRouter;