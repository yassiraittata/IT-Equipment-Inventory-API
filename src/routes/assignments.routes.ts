import { Router } from "express";
import { validateParams } from "../middlewares/paramsValidator.js";
import { paramsSchema } from "../schemas/uuid.schema.js";
import {
  closeAssignments,
  createAssignments,
} from "../controllers/assignments.controller.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { assignmentSchema } from "../schemas/assignments.schema.js";
import { isAdmin, isAuth } from "../middlewares/authMiddleware.js";

export default (router: Router) => {
  router.post(
    "/equipment/:id/assign",
    isAuth,
    isAdmin,
    validateParams(paramsSchema),
    validateRequest(assignmentSchema),
    createAssignments,
  );
  router.post(
    "/equipment/:id/return",
    isAuth,
    isAdmin,
    validateParams(paramsSchema),
    closeAssignments,
  );
};
