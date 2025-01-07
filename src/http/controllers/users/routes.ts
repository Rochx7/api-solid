import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate.controller";
import { register } from "./register.controller";
import { profile } from "./profile.controller";

export async function userRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);

  /** Authenticated */
  app.get("/me", { onRequest: [verifyJWT] }, profile);
}
