import { AuthenticateUserController } from "./AuthenticateUserController";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

const authenticateUserUseCase = new AuthenticateUserUseCase();
const authenticateUserController = new AuthenticateUserController(
  authenticateUserUseCase
);

export { authenticateUserController };
