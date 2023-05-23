import { BadRequest } from "@infra/errors/BadRequest";
import { NextFunction, Request, Response } from "express";

export function errorHandling(
  err: BadRequest,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof BadRequest) {
    return res.status(err.statusCode).send(err.message);
  }

  console.error(err);

  return res.status(500).json({
    message: "Internal error",
  });
}
