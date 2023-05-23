import { BadRequest } from "@infra/errors/BadRequest";

import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { user } from "@modules/users/infra/schemas/User";

import { hash } from "bcryptjs";

export class CreateUserUseCase {
  async execute({ cpf, password }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await user
      .findOne({
        cpf,
      })
      .exec();

    if (userAlreadyExists) {
      throw new BadRequest("Usuário já cadastrado");
    }

    const hashedPassword = await hash(password, 8);

    await user.create({
      cpf,
      password: hashedPassword,
    });
  }
}
