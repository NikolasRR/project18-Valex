import { Request, Response, NextFunction } from "express";
import joi from "joi";

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