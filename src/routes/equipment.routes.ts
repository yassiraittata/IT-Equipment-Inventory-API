import { Router } from "express";
import {
  createEquipment,
  createEquipments,
  getAllEquipments,
  getSingleEquipment,
} from "../controllers/equipment.controller.js";
import { validateParams } from "../middlewares/paramsValidator.js";
import { paramsSchema } from "../schemas/uuid.schema.js";

export default (router: Router) => {
  router.get("/equipments", getAllEquipments);
  router.get(
    "/equipments/:id",
    validateParams(paramsSchema),
    getSingleEquipment,
  );
  router.post("/equipments/add", createEquipment);
  router.post("/equipments/add-many", createEquipments);
  // router.put("/equipments/:id");
  // router.delete("/equipments/:id");
};
