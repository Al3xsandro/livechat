import { ICreateUserDTO, userSchema } from "@modules/users/dtos/ICreateUserDTO";
import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { BadRequest } from "@infra/errors/BadRequest";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { cpf, password }: ICreateUserDTO = req.body;

    const serializer = userSchema.parseAsync({ cpf, password });

    await serializer.catch((err) => {
      throw new BadRequest(err);
    });

    await this.createUserUseCase.execute({
      cpf,
      password,
    });

    return res.status(201).send();
  }
}
