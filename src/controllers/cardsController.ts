import { Request, Response } from "express";

import { TransactionTypes } from "../repositories/cardRepository.js";
import * as service from "../services/cardServices.js";

export async function createCard(req: Request, res: Response) {
    const companyKey = req.headers[`x-api-key`].toString();
    const { employeeId, cardType }: { employeeId: number, cardType: TransactionTypes } = req.body;

    const employee = await service.verifyCardAvailability(companyKey, employeeId, cardType);

    const cardInfo = await service.generateCardInfoAndCard(employee, cardType);

    res.status(201).send(cardInfo);
}

export async function activateCard(req: Request, res: Response) {
    const { cardId, cardCVC, password }: { cardId: number, cardCVC: string, password: string } = req.body;

    await service.verifyAndActivateCard(cardId, cardCVC, password);
    res.sendStatus(200);
}

export async function blockCard(req: Request, res: Response) {
    const { cardId, password }: { cardId: number, password: string } = req.body;

    await service.verifyAndBlockCard(cardId, password);

    res.sendStatus(200);
}

export async function unblockCard(req: Request, res: Response) {
    const { cardId, password }: { cardId: number, password: string } = req.body;

    await service.verifyAndUnblockCard(cardId, password);

    res.sendStatus(200);
}