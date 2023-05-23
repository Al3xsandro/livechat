import { Router } from "express";

import { createUserController } from "@modules/users/useCases/CreateUser";
import { authenticateUserController } from "@modules/users/useCases/Session";
import { ensureAuth } from "@infra/middlewares/ensureAuth";
import { getUserController } from "@modules/users/useCases/Me";

const userRoutes = Router();

userRoutes.post("/users", (req, res) => createUserController.handle(req, res));
userRoutes.post("/users/session", (req, res) =>
  authenticateUserController.handle(req, res)
);
userRoutes.get("/users/me", ensureAuth, (req, res) =>
  getUserController.handle(req, res)
);

export { userRoutes };
