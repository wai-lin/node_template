import { Router } from "express";
import { authRoutes } from "./authentication/auth.routes.ts";

const routes = Router();

routes.use(authRoutes);

export { routes };
