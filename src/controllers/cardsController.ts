import { Request, Response } from "express";

import { TransactionTypes } from "../repositories/cardRepository.js";
import * as service from "../services/cardServices.js";

export async function createCard(req: Request, res: Response) {
    const { cardType } : {cardType: TransactionTypes} = req.body;
    const { employee } = res.locals;

    const response = await service.generateCardInfoAndCard(employee, cardType);
    
    res.status(201).send(response);
}

export async function activateCard(req: Request, res: Response) {
    const { cardId, cardCVC, password } : { cardId: number, cardCVC: string, password: string }= req.body;

    await service.verifyAndActivateCard(cardId, cardCVC, password);
    res.sendStatus(200);
     
}