import { Router } from "express";
import {
  createMaintenance,
  getMaintenances,
  getSingleMaintenance,
  updateMaintenance,
} from "../controllers/maintenance_logs.controller.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { maintenanceSchema } from "../schemas/maintenance.schema.js";
import { validateParams } from "../middlewares/paramsValidator.js";
import { paramsSchema } from "../schemas/uuid.schema.js";

export default (router: Router) => {
  router.post(
    "/equipment/:id/maintenance",
    validateParams(paramsSchema),
    validateRequest(maintenanceSchema),
    createMaintenance,
  );
  router.get("/maintenance_logs", getMaintenances);
  router.get(
    "/maintenance_logs/:id",
    validateParams(paramsSchema),
    getSingleMaintenance,
  );
  
  router.put(
    "/maintenance_logs/:id",
    validateParams(paramsSchema),
    updateMaintenance,
  );
};
