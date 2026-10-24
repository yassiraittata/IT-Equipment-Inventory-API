import { Router } from "express";
import categoryRoutes from "./category.routes.js";
import officeRoutes from "./office.routes.js";
import equipmentRoutes from "./equipment.routes.js";
import assignmentsRoutes from "./assignments.routes.js";
import maintenance_logsRoutes from "./maintenance_logs.routes.js";
import usersRoutes from "./users.routes.js";

const router = Router();

export default () => {
  categoryRoutes(router);
  officeRoutes(router);
  equipmentRoutes(router);
  assignmentsRoutes(router);
  maintenance_logsRoutes(router);
  usersRoutes(router);

  return router;
};
