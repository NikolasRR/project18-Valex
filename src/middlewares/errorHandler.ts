import { NextFunction, Request, Response } from "express"

export default async function errorHandler(error, req: Request, res: Response, next: NextFunction) {
    res.status(error.code).send(error.type);
}