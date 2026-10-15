import { Router } from "express";
import {
  createEquipment,
  createEquipments,
  deleteEquipment,
  getAllEquipments,
  getSingleEquipment,
  updateEquipment,
  getEquipementByoffice,
} from "../controllers/equipment.controller.js";
import { validateParams } from "../middlewares/paramsValidator.js";
import { paramsSchema } from "../schemas/uuid.schema.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { equipmentSchema } from "../schemas/equipment.schema.js";

export default (router: Router) => {
  router.get("/equipments", getAllEquipments);
  router.get(
    "/equipments/:id",
    validateParams(paramsSchema),
    getSingleEquipment,
  );
  router.get(
    "/equipments/office/:id",
    validateParams(paramsSchema),
    getEquipementByoffice,
  );
  router.post(
    "/equipments/add",
    validateRequest(equipmentSchema),
    createEquipment,
  );
  router.post("/equipments/add-many", createEquipments);
  router.put("/equipments/:id", validateParams(paramsSchema), updateEquipment);
  router.delete(
    "/equipments/:id",
    validateParams(paramsSchema),
    deleteEquipment,
  );
};
