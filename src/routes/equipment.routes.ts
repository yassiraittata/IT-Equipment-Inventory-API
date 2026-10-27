import { Router } from "express";
import {
  createEquipment,
  createEquipments,
  deleteEquipment,
  getAllEquipments,
  getSingleEquipment,
  updateEquipment,
  getEquipementByOffice,
  getEquipementByCategory,
  getHistory,
} from "../controllers/equipment.controller.js";
import { validateParams } from "../middlewares/paramsValidator.js";
import { paramsSchema } from "../schemas/uuid.schema.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { equipmentSchema } from "../schemas/equipment.schema.js";
import { isAdmin, isAuth } from "../middlewares/authMiddleware.js";

export default (router: Router) => {
  router.get("/equipments", getAllEquipments);
  router.get(
    "/equipments/:id",
    isAuth,
    validateParams(paramsSchema),
    getSingleEquipment,
  );
  router.get(
    "/equipments/office/:id",
    isAuth,
    validateParams(paramsSchema),
    getEquipementByOffice,
  );
  router.get(
    "/equipments/category/:id",
    isAuth,
    validateParams(paramsSchema),
    getEquipementByCategory,
  );
  router.post(
    "/equipments/add",
    isAuth,
    isAdmin,
    validateRequest(equipmentSchema),
    createEquipment,
  );
  router.post("/equipments/add-many", isAuth, isAdmin, createEquipments);
  router.put(
    "/equipments/:id",
    isAuth,
    isAdmin,
    validateParams(paramsSchema),
    updateEquipment,
  );
  router.delete(
    "/equipments/:id",
    isAuth,
    isAdmin,
    validateParams(paramsSchema),
    deleteEquipment,
  );
  // the history of an item
  router.get(
    "/equipment/:id/assignments",
    isAuth,
    validateParams(paramsSchema),
    getHistory,
  );
};
