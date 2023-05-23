import { Request, Response, NextFunction } from "express";

import { verify } from "jsonwebtoken";

import { BadRequest } from "@infra/errors/BadRequest";

import auth from "@config/auth";
import { user } from "@modules/users/infra/schemas/User";

interface IPayload {
  sub: string;
  user_origin: string;
  role: string;
}

export async function ensureAuth(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new BadRequest("Token inválido", 400);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

    const userOutput = await user.findOne({
      _id: user_id,
    });

    if (!userOutput) {
      throw new BadRequest("Token inválido", 400);
    }

    request.user = {
      id: user_id,
    };

    return next();
  } catch (err) {
    throw new BadRequest("Token inválido", 400);
  }
}
