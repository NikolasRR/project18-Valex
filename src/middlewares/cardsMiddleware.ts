import { Request, Response, NextFunction } from "express";

import { findByTypeAndEmployeeId, TransactionTypes } from "../repositories/cardRepository.js";
import { findByApiKey } from "../repositories/companyRepository.js";
import { findByEmployeeIdAndCompanyId } from "../repositories/employeeRepository.js";
import { cardDataSchema } from "../schemas/cardsSchemas.js";

export async function validationForCreation(req: Request, res: Response, next: NextFunction) {
    const companyKey = req.headers[`x-api-key`].toString();

    const { employeeId, cardType }: { employeeId: number, cardType: TransactionTypes } = req.body;

    const company = await findByApiKey(companyKey);
    if (!company) throw { type: 'company not found', code: 404 };

    const cardTypes = ['groceries', 'restaurants', 'transport', 'education', 'health'];
    if (!cardTypes.includes(cardType)) throw { type: 'card type not acceptable', code: 422 };

    const employee = await findByEmployeeIdAndCompanyId(employeeId, company.id);
    if (!employee) throw { type: 'employee not found or not from company', code: 404 };

    const cardExists = await findByTypeAndEmployeeId(cardType, employeeId);
    if (cardExists) throw { type: 'employee already has said card', code: 409 };

    res.locals.employee = employee;

    next();
}

export async function validationForActivation(req: Request, res: Response, next: NextFunction) {
    const validation = cardDataSchema.validate(req.body);
    if (validation.error) throw { type: "card info format is wrong", code: 422 }
    
    next();
}