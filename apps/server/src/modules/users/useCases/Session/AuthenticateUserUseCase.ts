import { BadRequest } from "@infra/errors/BadRequest";
import { IAuthenticateUserDTO } from "@modules/users/dtos/IAuthenticateDTO";
import { user } from "@modules/users/infra/schemas/User";

import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import auth from "@config/auth";

export class AuthenticateUserUseCase {
  async execute({ cpf, password }: IAuthenticateUserDTO): Promise<{
    id: string;
    cpf: string;
    token: string;
  }> {
    const userExists = await user
      .findOne({
        cpf,
      })
      .exec();

    if (!userExists) {
      throw new BadRequest("CPF ou senha inválidos");
    }

    const passwordMatch = compare(password, userExists.password);

    if (!passwordMatch) {
      throw new BadRequest("CPF ou senha inválidos");
    }

    const token = sign({ id: userExists?._id }, auth.secret_token, {
      subject: userExists.id,
      expiresIn: auth.expires_in,
    });

    return {
      id: userExists.id,
      cpf: userExists.cpf,
      token,
    };
  }
}
