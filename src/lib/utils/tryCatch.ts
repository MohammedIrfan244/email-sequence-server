import { Request,Response, NextFunction } from "express";

export const tryCatch = <T>(fn: (req: Request, res: Response, next: NextFunction) => Promise<T>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try{
            await fn(req, res, next);
        }catch (error : unknown) {
            next(error);
        }
    }
}