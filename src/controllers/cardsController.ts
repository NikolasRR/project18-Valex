import { Request, Response } from "express";

import { TransactionTypes } from "../repositories/cardRepository";
import * as service from "../services/cardServices.js";

export async function createCard(req: Request, res: Response) {
    const { cardType } : {cardType: TransactionTypes} = req.body;
    const { employee } = res.locals;

    service.generateCardInfoAndCard(employee, cardType);

    res.sendStatus(201)
}