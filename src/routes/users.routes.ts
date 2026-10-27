import { Router } from "express";

import { validateRequest } from "../middlewares/validateRequest.js";
import {
  userSchema,
  loginSchema,
  updateUserSchema,
} from "../schemas/user.schema.js";
import {
  createUser,
  login,
  getEmpoloyees,
  getSingleEmpoloyee,
  updateEmpoloyee,
  deleteEmployee,
} from "../controllers/users.controller.js";
import { validateParams } from "../middlewares/paramsValidator.js";
import { paramsSchema } from "../schemas/uuid.schema.js";

export default (router: Router) => {
  router.post("/users/register", validateRequest(userSchema), createUser);
  router.post("/users/login", validateRequest(loginSchema), login);
  router.get("/employees", getEmpoloyees);
  router.get(
    "/employees/:id",
    validateParams(paramsSchema),
    getSingleEmpoloyee,
  );
  router.put(
    "/employees/:id",
    validateParams(paramsSchema),
    validateRequest(updateUserSchema),
    updateEmpoloyee,
  );
  router.delete("/employees/:id", validateParams(paramsSchema), deleteEmployee);
};
