import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

import { userSchema } from "@modules/users/dtos/ICreateUserDTO";
import { IAuthenticateUserDTO } from "@modules/users/dtos/IAuthenticateDTO";
import { BadRequest } from "@infra/errors/BadRequest";

export class AuthenticateUserController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { cpf, password }: IAuthenticateUserDTO = req.body;

    const serializer = userSchema.parseAsync({ cpf, password });

    await serializer.catch((err) => {
      throw new BadRequest(err);
    });

    const token = await this.authenticateUserUseCase.execute({ cpf, password });

    return res.status(200).send(token);
  }
}
