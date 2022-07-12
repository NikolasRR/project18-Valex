import { Request, Response, NextFunction } from "express";
import { amountAndIdSchema, purchaseSchema } from "../schemas/transactionsSchemas.js";

export function verifyAmount(req: Request, res: Response, next: NextFunction) {
    const { amount }: { amount: number } = req.body;

    if (amount > 0) {
        next();
        return;
    }

    throw { type: "amount needs to be bigger than zero", code: 422 };
}

export function verifyCompanyKey(req: Request, res: Response, next: NextFunction) {
    const companyKey = req.headers[`x-api-key`].toString();

    if (!companyKey) throw { type: "API key missing", code: 422 };

    next();
}

export function verifyIdAndAmount(req: Request, res: Response, next: NextFunction) {
    const validation = amountAndIdSchema.validate(req.body);
    if (validation.error) throw { type: "card info format is wrong", code: 422 };

    next();
}

export function verifyPurchaseData(req: Request, res: Response, next: NextFunction) {
    const validation = purchaseSchema.validate(req.body);
    if (validation.error) throw { type: "card info format is wrong", code: 422 };

    next();
}

export function verifyCardId(req: Request, res: Response, next: NextFunction) {
    const { cardid } = req.headers;
    if(!cardid) throw { type: "card info format is wrong", code: 422 };

    next();
}