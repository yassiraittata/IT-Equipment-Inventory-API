import { Router } from "express";
import categoryRoutes from "./category.routes.js";
import officeRoutes from "./office.routes.js";
import equipmentRoutes from "./equipment.routes.js";

const router = Router();

export default () => {
  categoryRoutes(router);
  officeRoutes(router);
  equipmentRoutes(router);

  return router;  
};
