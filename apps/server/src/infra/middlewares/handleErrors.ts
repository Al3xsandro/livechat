import { BadRequest } from "@infra/errors/BadRequest";
import { NextFunction, Request, Response } from "express";

export function errorHandling(
  err: BadRequest,
  req: Request,
  res: Response,
  next: NextFunction
) {
  return res.status(err.statusCode).json({
    msg: err.message,
    success: false,
  });
}
