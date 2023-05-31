import { GetUserController } from "./GetUserController";
import { GetUserUseCase } from "./GetUserUseCase";

const getUserUseCase = new GetUserUseCase();
const getUserController = new GetUserController(getUserUseCase);

export { getUserController };
