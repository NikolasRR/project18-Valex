import { NextFunction, Request, Response } from "express"

export default async function errorHandler(error, req: Request, res: Response, next: NextFunction) {
    res.sendStatus(error.code);
}