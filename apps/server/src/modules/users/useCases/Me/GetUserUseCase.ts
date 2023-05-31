import { BadRequest } from "@infra/errors/BadRequest";
import { user } from "@modules/users/infra/schemas/User";

export class GetUserUseCase {
  async execute(user_id: string) {
    const output = await user
      .findOne({
        _id: user_id,
      })
      .exec();

    if (!output) {
      throw new BadRequest("Algo deu errado", 500);
    }

    return {
      id: output._id,
      cpf: output.cpf,
    };
  }
}
