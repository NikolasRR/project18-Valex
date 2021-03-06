import { Request, Response, NextFunction } from "express";

import { cardDataSchema, IdAndPasswordSchema, infoForCardCreationSchema } from "../schemas/cardsSchemas.js";

export async function validationForCreation(req: Request, res: Response, next: NextFunction) {
    const validation = infoForCardCreationSchema.validate(req.body);
    if (validation.error) throw { type: "card info format is wrong", code: 422 };

    next();
}

export async function validationForActivation(req: Request, res: Response, next: NextFunction) {
    const validation = cardDataSchema.validate(req.body);
    if (validation.error) throw { type: "card info format is wrong", code: 422 };

    next();
}

export async function validateIdAndPassword(req: Request, res: Response, next: NextFunction) {
    const validation = IdAndPasswordSchema.validate(req.body);
    if (validation.error) throw { type: "card info format is wrong", code: 422 };

    next();
}

export function verifyCompanyKey(req: Request, res: Response, next: NextFunction) {
    const companyKey = req.headers[`x-api-key`].toString();

    if (!companyKey) throw { type: "API key missing", code: 422 };

    next();
}