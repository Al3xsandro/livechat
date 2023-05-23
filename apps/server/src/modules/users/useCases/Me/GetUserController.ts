import { Request, Response } from "express";
import { GetUserUseCase } from "./GetUserUseCase";

export class GetUserController {
  constructor(private getUserUseCase: GetUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const user = await this.getUserUseCase.execute(id);

    return res.status(200).json(user);
  }
}
