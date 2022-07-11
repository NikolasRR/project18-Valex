import { Request, Response, NextFunction } from "express";

export function verifyRechargeValue(req: Request, res: Response, next: NextFunction) {
    const { amount }: { amount: number } = req.body;

    if (amount > 0) {
        next();
        return;
    }

    throw { type: "amount needs to be bigger than zero", code: 422 };
}