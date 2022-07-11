import { Request, Response } from "express";
import { verifyAndRechargeCard } from "../services/TransactionServices.js";

export async function rechargeCard(req: Request, res: Response) {
    const companyKey = req.headers[`x-api-key`].toString();
    const { cardId, amount }: { cardId: number, amount: number } = req.body;

    await verifyAndRechargeCard(companyKey, cardId, amount);

    res.sendStatus(200);
}