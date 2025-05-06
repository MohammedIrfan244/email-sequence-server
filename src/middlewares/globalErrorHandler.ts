import { Request, Response, NextFunction } from "express";
import { errorLogger } from "../lib/utils/devLogger";

interface CustomError extends Error {
  statusCode?: number;
  status?: string;
}

const globalErrorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) : void =>  {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong!";
  const status = err.status || "error";

  errorLogger(`Error: ${message}`);
  errorLogger(`Status Code: ${status}`);

  res.status(statusCode).json({
    status,
    message,
  });
};

export default globalErrorHandler;



