import { Request, Response } from "express";
import { verifyAndPurchase, verifyAndRechargeCard } from "../services/TransactionServices.js";

export async function rechargeCard(req: Request, res: Response) {
    const companyKey = req.headers[`x-api-key`].toString();
    const { cardId, amount }: { cardId: number, amount: number } = req.body;

    await verifyAndRechargeCard(companyKey, cardId, amount);

    res.sendStatus(200);
}

export async function purchase(req: Request, res: Response) {
    const { cardId, password, amount, businessId }: 
    { cardId: number, password: string, amount: number, businessId: number } = req.body;

    await verifyAndPurchase(cardId, password, amount, businessId);

    res.sendStatus(200);
}