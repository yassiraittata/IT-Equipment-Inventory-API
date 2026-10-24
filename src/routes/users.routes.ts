import { Router } from "express";

import { validateRequest } from "../middlewares/validateRequest.js";
import { userSchema, loginSchema } from "../schemas/user.schema.js";
import { createUser, login } from "../controllers/users.controller.js";

export default (router: Router) => {
  router.post("/users/register", validateRequest(userSchema), createUser);
  router.post("/users/login", validateRequest(loginSchema), login);
  //   router.get("/employees");
  //   router.get("/employees/:id");
  //   router.put("/employees/:id");
  //   router.delete("/employees/:id");
};
