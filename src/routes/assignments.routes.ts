import { Router } from "express";
import { validateParams } from "../middlewares/paramsValidator.js";
import { paramsSchema } from "../schemas/uuid.schema.js";
import { createAssignments } from "../controllers/assignments.controller.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { assignmentSchema } from "../schemas/assignments.schema.js";

export default (router: Router) => {
  router.post(
    "/equipment/:id/assign",
    validateParams(paramsSchema),
    validateRequest(assignmentSchema),
    createAssignments,
  );
};
