import { Router } from "express";
import { userRoutes } from "@modules/users/infra/routes";

const routes = Router();

routes.use(userRoutes);

export { routes };
