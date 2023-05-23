import { Router } from "express";

import { createUserController } from "@modules/users/useCases/CreateUser";
import { authenticateUserController } from "@modules/users/useCases/Session";

const userRoutes = Router();

userRoutes.post("/users", (req, res) => createUserController.handle(req, res));
userRoutes.post("/users/session", (req, res) =>
  authenticateUserController.handle(req, res)
);

export { userRoutes };
